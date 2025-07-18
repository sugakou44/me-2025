#include "@/lib/shaders/noises/snoise.glsl"

float getWindStrength(vec3 worldPos, float time) {
    return snoise(vec3(worldPos.xy * 0.5, 0.0) + time);
}

vec3 getWindAxis(vec3 worldPos, float time) {
    float tick = time * 0.05;
    float angle = snoise(worldPos.xy + tick);
    return vec3(cos(angle), sin(angle), 0.0);
    // return vec3(cos(0.0), sin(0.0), 0.0);
}
