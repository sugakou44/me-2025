#if defined(PATTERN_CIRCLE)
#include "@/lib/shaders/patterns/circle.glsl"
#elif defined(PATTERN_SQUARE)
#include "@/lib/shaders/patterns/square.glsl"
#elif defined(PATTERN_PLUS)
#include "@/lib/shaders/patterns/plus.glsl"
#elif defined(PATTERN_STAR)
#include "@/lib/shaders/patterns/star.glsl"
#elif defined(PATTERN_STRIPE)
#include "@/lib/shaders/patterns/stripe.glsl"
#elif defined(PATTERN_CROSS)
#include "@/lib/shaders/patterns/cross.glsl"
#elif defined(PATTERN_SPLAT)
#include "@/lib/shaders/patterns/splat.glsl"
#elif defined(PATTERN_TRIANGLE)
#include "@/lib/shaders/patterns/triangle.glsl"
#else
float pattern(vec2 uv, float patternCount, float patternScaleRatio)
{
    return 1.0;
}
#endif
