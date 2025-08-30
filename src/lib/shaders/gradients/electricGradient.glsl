#include "@/shaders/math.glsl"

vec3 electricGradient(float t) {
    return clamp(vec3(t * 8.0 - 6.3, square(smoothstep(0.6, 0.9, t)), pow(t, 3.0) * 1.7), 0.0, 1.0);
}
