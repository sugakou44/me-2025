#include "@/lib/shaders/noises/snoise.glsl"
#include "@/lib/shaders/math.glsl"

uniform float tick;
uniform vec3 diffuseColor;
uniform vec3 tipColor;
uniform vec3 origin;
uniform float opacity;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    float distanceToOrigin = distance(vPosition, origin);
    vec3 color = mix(diffuseColor, tipColor, distanceToOrigin / 20.0);

    float noise = 1.5 - mapRangeUv(snoise(vPosition / 10.0));
    if (opacity < 0.001) {
        discard;
    }

    gl_FragColor = vec4((color + 0.1) * noise, opacity);
}
