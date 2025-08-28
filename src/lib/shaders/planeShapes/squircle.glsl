// https://thebookofshaders.com/07

#include "@/lib/shaders/math.glsl"

float shape(vec2 uv, float radius, float roundness)
{
    vec2 st = uv;

    st = st * 2. - 1.;

    float aSqr = pow(abs(st.x) / roundness, radius) + pow(abs(st.y) / roundness, radius);

    if (aSqr > 0.5) {
        return 1.0;
    }

    return 0.0;
}
