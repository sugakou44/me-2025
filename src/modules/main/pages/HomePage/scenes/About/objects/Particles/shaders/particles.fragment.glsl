#include "@/modules/main/shaders/color.glsl"

uniform float tick;
uniform float opacity;
uniform float index;
uniform sampler2DArray textures;

in vec3 vNormal;
in vec4 vColor;
in float vTextureIndex;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);

    if (distanceToCenter > 0.5) {
        discard;
    }

    vec2 uv = gl_PointCoord;
    uv = uv * 1.2 - 0.1;
    uv.y = 1.0 - uv.y;

    vec4 texel = texture(textures, vec3(uv, vTextureIndex));

    float _opacity = opacity * vColor.a;

    if (_opacity < 0.01) {
        discard;
    }

    vec3 outColor = normalizeColor(vColor.rgb) + 0.1;

    if (texel.a > 0.8) {
        outColor = vec3(1.0);
    }

    gl_FragColor = vec4(outColor, _opacity);
}
