// https://threejs-journey.com/lessons/shader-patterns

float splatPattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    vec2 wavedUv = vec2(
            uv.x + sin(uv.y * patternCount * 4.) * 0.1,
            uv.y + sin(uv.x * patternCount * 4.) * 0.1
        );

    float strength = 1.0 - step(patternScaleRatio * 0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    return 1.0 - strength;
}
