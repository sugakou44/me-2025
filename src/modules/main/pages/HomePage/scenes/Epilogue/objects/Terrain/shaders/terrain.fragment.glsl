#include "@/lib/shaders/math.glsl"
// #include "@/lib/shaders/noises/voronoi.glsl"
#include "@/lib/shaders/noises/snoise.glsl"

uniform vec3 diffuseColor;
uniform float mixFactor;
uniform float opacity;

in vec3 vPosition;

void main()
{
    float noise = mapRangeUv(snoise(vPosition.xy / 10.0));
    vec3 color = diffuseColor + noise + 0.2;
    // color = voronoi(vPosition.xy);

    color = mix(color, vec3(1.0), mixFactor);

    gl_FragColor = vec4(color, opacity);
}
