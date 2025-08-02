// https://thebookofshaders.com/07

#include "@/lib/shaders/math.glsl"

float shape(vec2 uv, float borderWidth, float shapeRatio)
{
    vec2 st = uv;
    vec3 color = vec3(0.0);

    // Remap the space to -1. to 1.
    st = st * 2. - 1.;

    // Angle and radius from the current pixel
    float angle = atan(st.x, st.y) + PI;
    float radius = TWO_PI / 3.0;

    // Shaping function that modulate the distance
    float distance = cos(floor(0.5 + angle / radius) * radius - angle) * length(st);

    float startStep = 0.5;
    float filledStrength = 1.0 - step(startStep, distance);

    float innerStrength = 0.0;
    if (borderWidth > 0.01) {
        innerStrength = 1.0 - step(startStep - borderWidth, distance);
    }

    return filledStrength - innerStrength;
}
