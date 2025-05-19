
vec3 ansiGradient(float t) {
    return mod(floor(t * vec3(8.0, 4.0, 2.0)), 2.0);
}
