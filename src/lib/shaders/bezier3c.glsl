// https://gist.github.com/yiwenl/bb87c2d7df8bc735dab017c808a381ab
// bezier curve with 3 control points
// A is the starting point, B, C, D are the control points, E is the destination
// t from 0 ~ 1

vec3 bezier3c(vec3 A, vec3 B, vec3 C, vec3 D, vec3 E, float t) {
    vec3 A1 = mix(A, B, t);
    vec3 B1 = mix(B, C, t);
    vec3 C1 = mix(C, D, t);
    vec3 D1 = mix(D, E, t);

    vec3 A2 = mix(A1, B1, t);
    vec3 B2 = mix(B1, C1, t);
    vec3 C2 = mix(C1, D1, t);

    vec3 A3 = mix(A2, B2, t);
    vec3 B3 = mix(B2, C2, t);

    vec3 P = mix(A3, B3, t);

    return P;
}
