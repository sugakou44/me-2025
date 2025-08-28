#include "@/lib/shaders/noises/snoise.glsl"
#include "@/lib/shaders/math.glsl"

float getWindStrength(vec3 worldPos, float time) {
    return mapRangeUv(snoise(vec3(worldPos.xy * 2.0, 0.0) + time));
}

vec3 getWindAxis(vec3 worldPos, float time) {
    float tick = time * 0.5;
    float angle = snoise(vec2(tick) * .01) * PI;
    return vec3(cos(angle), sin(angle), 0.0);
    // return vec3(cos(0.0), sin(0.0), 0.0);
}
