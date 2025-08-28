
#include "@/modules/main/shaders/color.glsl"
#include "@/lib/shaders/colors.glsl"

uniform float tick;
uniform float opacity;
uniform float index;
uniform sampler2DArray textures;

in vec3 vNormal;
in vec2 vUv;
in vec3 vColor;
in float vIndex;

void main()
{
    vec4 texel = texture(textures, vec3(vUv, vIndex));

    float _opacity = opacity * texel.a;

    if (_opacity < 0.01) {
        discard;
    }

    vec3 outColor = normalizeColor(vColor);

    gl_FragColor = vec4(outColor, _opacity);
}
