#include "@/lib/shaders/noises/snoise.glsl"
#include "@/lib/shaders/math.glsl"

uniform float tick;
uniform float scale;
uniform vec3 diffuseColor;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    float noise = 1.5 - mapRangeUv(snoise(vPosition / 2.0));

    gl_FragColor = vec4(diffuseColor + noise, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
