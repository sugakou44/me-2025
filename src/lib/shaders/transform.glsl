#include "./math.glsl"
#include "./bezier2c.glsl"

mat2 rot2D(float a) {
    return mat2(cos(a), -sin(a), sin(a), cos(a));
}
