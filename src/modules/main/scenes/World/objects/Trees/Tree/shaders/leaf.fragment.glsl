
#include "@/lib/shaders/transform.glsl"
#include "@/lib/shaders/math.glsl"
#include "@/lib/shaders/sdf/pie.glsl"
#include "@/lib/shaders/sdf/segment.glsl"
#include "@/lib/shaders/noises/snoise.glsl"

uniform float tick;
uniform vec3 diffuseColor;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    vec2 uv = vUv;

    float y = uv.y * 4.0;
    int yAsInt = int(y);
    float side = (mod(y, 2.0) > 1.0) ? 1.0 : -1.0;
    vec2 coord = vec2(uv.x, fract(y * side));
    float str = sdPie(coord, vec2(0.0), 0.5);

    if (str > 0.5) {
        discard;
    }

    str = sdSegment(vUv, vec2(0.0, -1.0), vec2(0.0, 0.1));

    float noise = 1. - mapRangeUv(snoise(vPosition / 10.0));

    gl_FragColor = vec4(diffuseColor, 1.0);
}
