// https://threejs-journey.com/lessons/shader-patterns

float stripePattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    float strength = mod(uv.y * patternCount, patternScaleRatio);
    strength = step(0.5, strength);

    return strength;
}
