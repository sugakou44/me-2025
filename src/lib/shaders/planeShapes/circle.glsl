#include "@/lib/glsl/math.glsl"

float shape(vec2 uv, float borderWidth, float shapeRatio)
{
    vec2 st = uv;
    // Remap the space to -1. to 1.
    st = st * 2. - 1.;

    float radius = distance(vec2(0, st.y / shapeRatio), vec2(st.x, 0));

    float startStep = 1.0;
    float filledStrength = 1.0 - step(startStep, radius);
    float innerStrength = 0.0;
    if (borderWidth > 0.01) {
        innerStrength = 1.0 - step(startStep - borderWidth, radius);
    }

    return filledStrength - innerStrength;
}
