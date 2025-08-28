#include "@/lib/shaders/noises/snoise.glsl"
#include "@/lib/shaders/math.glsl"

uniform float tick;
uniform vec3 diffuseColor;
uniform float opacity;
uniform sampler2D map;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    if (opacity < 0.001) {
        discard;
    }
    // vec3 color = mix(vec3(1.0), diffuseColor, smoothstep(0.0, 20.0, vPosition.z));
    //
    float distanceToOrigin = distance(vPosition.z, vPosition.z);
    vec3 color = mix(diffuseColor, vec3(1.0), distanceToOrigin / 20.0);
    float noise = 2.0 - mapRangeUv(snoise(vPosition.xz / 10.0));

    color *= noise;
    color += 0.1;
    color = mix(vec3(1.0), color, smoothstep(0.0, 20.0, vPosition.z * 4.4));
    gl_FragColor = vec4(color, opacity);
    // gl_FragColor = vec4(color, opacity);
}
