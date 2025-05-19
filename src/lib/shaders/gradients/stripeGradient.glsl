
vec3 stripeGradient(float t) {
    return vec3(mod(floor(t * 32.0), 2.0) * 0.2 + 0.8);
}
