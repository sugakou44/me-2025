// https://threejs-journey.com/lessons/shader-patterns

float starPattern(vec2 uv, float patternCount, float patternScaleRatio) {
    float angle = atan(uv.x - 0.5, uv.y - 0.5) / (PI * 2.0) + 0.5;
    float radius = 0.25 + sin(angle * patternCount * 10.0) * 0.02;
    float strength = 1.0 - step(patternScaleRatio * 0.01, abs(distance(uv, vec2(0.5)) - radius));

    return 1.0 - strength;
}
