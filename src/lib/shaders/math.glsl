
#define M_PI 3.14159265359
#define M_TWO_PI 6.28318530718
float dot2(in vec2 v) {
    return dot(v, v);
}

float ndot(in vec2 a, in vec2 b) {
    return a.x * b.x - a.y * b.y;
}

float random(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float mapRange(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float square(float s) {
    return s * s;
}
vec3 square(vec3 s) {
    return s * s;
}
