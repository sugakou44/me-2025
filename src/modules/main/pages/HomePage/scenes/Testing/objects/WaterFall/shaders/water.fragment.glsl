#include "@/lib/shaders/math.glsl"
#include "@/lib/shaders/noises/curl.glsl"
#include "@/lib/shaders/noises/voronoi.glsl"
#include "@/lib/shaders/colors.glsl"
#include "@/lib/shaders/easing.glsl"

uniform float tick;
uniform vec3 diffuseColor;
uniform vec2 center;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    vec2 uv = (vUv * 2.0 - 1.0) - center;
    vec2 absUv = abs(uv * 4.0);
    float height = abs(fract(length(absUv) - tick) - 0.5) * 2.0;

    height = smoothstep(0.0, 1.0, height);

    vec2 noise = curl(uv + height);

    float distanceFromCenter = saturate(distance(center.xy, absUv) / 4.0);

    float alpha = smoothstep(0.25, 1.1, 1.0 - distanceFromCenter);

    noise.x *= alpha;

    vec3 outColor = mix(diffuseColor, vec3(1.0, 1.0, 1.0), noise.x * 1.5);

    gl_FragColor = vec4(outColor, 1.0);
}
