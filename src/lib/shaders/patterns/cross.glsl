// https://threejs-journey.com/lessons/shader-patterns

float crossPattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    float barX = step(0.4, mod(uv.x * patternCount - .3, patternScaleRatio)) * step(0.8, mod(uv.y * patternCount - 0.1, patternScaleRatio));
    float barY = step(0.8, mod(uv.x * patternCount - .1, patternScaleRatio)) * step(0.4, mod(uv.y * patternCount - 0.3, patternScaleRatio));
    float strength = barX + barY;

    return 1.0 - strength;
}
