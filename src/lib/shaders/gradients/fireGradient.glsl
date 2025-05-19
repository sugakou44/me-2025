
vec3 fireGradient(float t) {
    return max(pow(vec3(min(t * 1.02, 1.0)), vec3(1.7, 25.0, 100.0)),
        vec3(0.06 * pow(max(1.0 - abs(t - 0.35), 0.0), 5.0)));
}
