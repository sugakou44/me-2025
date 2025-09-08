#include "@/shaders/colors"
#include "@/modules/main/shaders/color.glsl"

uniform sampler2D borderTexture;
uniform sampler2D backgroundTexture;
uniform ivec2 resolution;
uniform ivec2 textureResolution;
uniform vec3 diffuse;
uniform float opacity;
uniform float edgeThreshold;
uniform int inverseColor;

in vec2 vUv;

vec3 sampleGrayscale(sampler2D textureArg, vec2 position) {
    vec4 grayscaleTexel = texture(textureArg, position);

    return grayscale(grayscaleTexel.rgb);
}

bool edgeDetect(sampler2D textureArg, ivec2 dimension, vec2 uv) {
    vec2 cellSize = vec2(1.0 / float(dimension.x), 1.0 / float(dimension.y));

    vec3 centralTexel = sampleGrayscale(textureArg, uv);
    vec3 bottomTexel = sampleGrayscale(textureArg, uv + vec2(0.0, cellSize.y));
    vec3 rightTexel = sampleGrayscale(textureArg, uv + vec2(cellSize.x, 0.0));

    float dFdX = length(rightTexel - centralTexel);
    float dFdY = length(bottomTexel - centralTexel);

    return dFdX > edgeThreshold || dFdY > edgeThreshold;
}

void main()
{
    float aspectRatio = float(resolution.x) / float(resolution.y);
    float textureAspectRatio = float(textureResolution.x) / float(textureResolution.y);

    vec2 scaledUV = vUv;
    if (aspectRatio > textureAspectRatio) {
        // Screen is wider, scale based on height
        scaledUV.y *= (textureAspectRatio / aspectRatio);
        scaledUV.y -= (textureAspectRatio / aspectRatio - 1.0) / 2.0;
    } else {
        scaledUV.x *= (aspectRatio / textureAspectRatio);
        scaledUV.x -= (aspectRatio / textureAspectRatio - 1.0) / 2.0;
    }
    scaledUV *= 0.9;
    scaledUV += 0.05;

    vec2 fracturedUv = scaledUV;
    fracturedUv.x *= textureAspectRatio;
    fracturedUv = fract(fracturedUv * 88.0);
    vec4 borderTexel = texture(borderTexture, vUv);
    vec4 texel = texture(backgroundTexture, scaledUV);
    bool isEdgeDetected = edgeDetect(backgroundTexture, textureResolution, scaledUV);

    float grayscaledColor = abs((inverseColor == 1 ? 0.0 : 1.0) - grayscale(texel.rgb).r);
    float diffuseMultiplier = round(grayscaledColor * 2.0) / 6.0;

    vec3 outColor = vec3(1.0);

    if (borderTexel.a > 0.1) {
        outColor = diffuse;
        outColor = normalizeColor(outColor);
    } else {
        if (isEdgeDetected) {
            outColor = diffuse;
            outColor = normalizeColor(outColor);
        } else if (grayscaledColor > 0.2) {
            float stepped = step(distance(fracturedUv, vec2(0.5)), diffuseMultiplier);
            // outColor = diffuse * diffuseMultiplier + 0.5;
            if (stepped > 0.5) {
                outColor = diffuse * stepped;
                outColor = normalizeColor(outColor);
            }
        }
    }

    gl_FragColor = vec4(outColor, opacity);
}
