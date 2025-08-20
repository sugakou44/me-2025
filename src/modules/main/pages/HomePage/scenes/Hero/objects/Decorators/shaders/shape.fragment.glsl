#if defined(SHAPE_CIRCLE)
#include "@/lib/shaders/planeShapes/circle.glsl"
#elif defined(SHAPE_RECTANGLE)
#include "@/lib/shaders/planeShapes/rectangle.glsl"
#elif defined(SHAPE_TRIANGLE)
#include "@/lib/shaders/planeShapes/triangle.glsl"
#elif defined(SHAPE_OCTAGON)
#include "@/lib/shaders/planeShapes/octagon.glsl"
#elif defined(SHAPE_PENTAGON)
#include "@/lib/shaders/planeShapes/pentagon.glsl"
#elif defined(SHAPE_HEXAGON)
#include "@/lib/shaders/planeShapes/hexagon.glsl"
#else
float shape(vec2 vUv, float borderWidth, float shapeRatio)
{
    return 1.0;
}
#endif
