#include "@/lib/shaders/math.glsl"

float pattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    vec2 st = uv;
    vec3 color = vec3(0.0);

    st = vec2(fract(st.x * patternCount), fract(st.y * patternCount)) - 0.5;

    // Angle and radius from the current pixel
    float angle = atan(st.x, st.y) + PI;
    float radius = M_TWO_PI / 3.0;

    // Shaping function that modulate the distance
    float distance = cos(floor(0.5 + angle / radius) * radius - angle) * length(st);

    float startStep = 0.5;
    float filledStrength = 1.0 - step(startStep, distance);

    return filledStrength;
}
