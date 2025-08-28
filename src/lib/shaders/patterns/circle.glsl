// https://threejs-journey.com/lessons/shader-patterns

float circlePattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    float strength = step(0.5, distance(vec2(fract(uv.x * patternCount), fract(uv.y * patternCount)), vec2(patternScaleRatio * 0.5)) + 0.25);

    return strength;
}
