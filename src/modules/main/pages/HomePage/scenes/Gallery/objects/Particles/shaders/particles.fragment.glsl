
#include "@/modules/main/shaders/color.glsl"

uniform float opacity;
uniform float count;

in vec4 vColor;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);

    if (distanceToCenter > 0.5) {
        discard;
    }

    vec4 outColor = vColor;

    outColor.a = outColor.a * opacity;

    if (outColor.a < 0.01) {
        discard;
    }

    outColor.xyz = normalizeColor(outColor.xyz);

    gl_FragColor = outColor;
}
