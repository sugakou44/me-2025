// https://threejs-journey.com/lessons/shader-patterns

float squarePattern(vec2 uv, float patternCount, float patternScaleRatio) {
    float strength = step(0.5, mod(uv.x * patternCount, patternScaleRatio));
    strength *= step(0.5, mod(uv.y * patternCount, patternScaleRatio));

    return 1.0 - strength;
}
