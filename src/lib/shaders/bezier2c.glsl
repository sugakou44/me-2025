// https://gist.github.com/yiwenl/bb87c2d7df8bc735dab017c808a381ab
// bezier curve with 2 control points
// A is the starting point, B, C are the control points, D is the destination
// t from 0 ~ 1
#include "@/shaders/math.glsl"

vec3 bezier2c(vec3 A, vec3 B, vec3 C, vec3 D, float t) {
    vec3 E = mix(A, B, t);
    vec3 F = mix(B, C, t);
    vec3 G = mix(C, D, t);

    vec3 H = mix(E, F, t);
    vec3 I = mix(F, G, t);

    vec3 P = mix(H, I, t);

    return P;
}
