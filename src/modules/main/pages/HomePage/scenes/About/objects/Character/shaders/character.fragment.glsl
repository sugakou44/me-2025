#include "@/modules/main/shaders/color.glsl"

uniform float opacity;

uniform sampler2D map;

in vec2 vUv;

void main()
{
    vec4 texel = texture(map, vUv);

    float _opacity = opacity * texel.a;

    if (_opacity < 0.01) {
        discard;
    }

    gl_FragColor = vec4(texel.rgb + 0.2, _opacity);
}
