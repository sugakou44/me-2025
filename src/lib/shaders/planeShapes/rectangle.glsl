// https://thebookofshaders.com/07

#include "@/lib/shaders/math.glsl"

float rectangle(vec2 uv, float borderWidth, float shapeRatio)
{
    vec2 st = uv;

    st = st * 2. - 1.;

    float startStep = 1.0;
    float filledStrengthX = 1.0 - step(startStep, abs(st.x));
    float filledStrengthY = 1.0 - step(startStep, abs(st.y / shapeRatio));
    float filledStrength = filledStrengthX * filledStrengthY;

    float innerStrength = 0.0;
    if (borderWidth > 0.01) {
        float innerStrengthX = 1.0 - step(startStep - (borderWidth * shapeRatio), abs(st.x));
        float innerStrengthY = 1.0 - step(startStep - borderWidth, abs(st.y / shapeRatio));

        innerStrength = innerStrengthX * innerStrengthY;
    }

    return filledStrength - innerStrength;
}
