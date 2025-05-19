
vec3 rainbowGradient(float t) {
    vec3 c = 1.0 - pow(abs(vec3(t) - vec3(0.65, 0.5, 0.2)) * vec3(3.0, 3.0, 5.0), vec3(1.5, 1.3, 1.7));
    c.r = max((0.15 - square(abs(t - 0.04) * 5.0)), c.r);
    c.g = (t < 0.5) ? smoothstep(0.04, 0.45, t) : c.g;
    return clamp(c, 0.0, 1.0);
}
