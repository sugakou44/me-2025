#include "@/shaders/math.glsl"
#include "@/shaders/noises/snoise.glsl"

uniform float opacity;
uniform float tick;
uniform float edgeRatio;

uniform vec2 origin;

uniform vec3 diffuse;

in vec2 vUv;

void main()
{
    vec2 uv = abs(vUv * 2.0 - 1.0);
    vec2 edgePoint = vec2(min(uv.x, edgeRatio), min(uv.y, edgeRatio));
    float distanceFromOrigin = distance(uv, origin) * 1.5;
    vec4 outColor = vec4(diffuse, opacity);

    if (opacity < 0.001) {
        discard;
    }

    if (uv.x >= edgeRatio || uv.y >= edgeRatio) {
        float distanceToEdge = distance(uv, edgePoint);
        float noiseDistance = 0.5 * cos((uv.x * uv.y * 20.0) + tick * 10.0);
        noiseDistance += 0.2 * sin((uv.y * 10.0) + tick * 20.0);
        noiseDistance += 0.2 * sin((uv.x * 10.0) + tick * 20.0);
        noiseDistance = mapRangeUv(noiseDistance);
        noiseDistance *= distanceFromOrigin;
        noiseDistance *= (1.0 - edgeRatio) / 2.0;
        noiseDistance += edgeRatio;
        outColor.a = 1.0 - step(1.0, noiseDistance + distanceToEdge);
    }

    gl_FragColor = outColor;
}
