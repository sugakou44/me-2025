
#include "@/modules/main/shaders/wind.glsl"

uniform sampler2D fadeTexture;
uniform sampler2D skyTexture;
uniform float opacity;
uniform float tick;

in vec2 vUv;
in vec3 vMPosition;

void main()
{
    vec3 windAxis = getWindAxis(vMPosition, tick);
    float windStrength = getWindStrength(vMPosition, tick);

    vec3 wind = windAxis * windStrength;

    vec2 uv = vUv;

    uv.x += wind.x * 0.002;
    uv.y += wind.y * 0.002;

    vec4 fadeTexel = texture(fadeTexture, vec2(uv.x, vUv.y));
    vec4 skyTexel = texture(skyTexture, uv);

    if (fadeTexel.r + 0.96 > clamp(opacity, 0.0, 1.0)) {
        discard;
    }

    vec3 outColor = skyTexel.rgb;
    outColor = outColor + 0.3;

    gl_FragColor = vec4(outColor, pow(vUv.y, 2.0));
}
