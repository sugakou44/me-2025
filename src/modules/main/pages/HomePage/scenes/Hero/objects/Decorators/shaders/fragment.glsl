#include "@/shaders/math.glsl"

#include "@/shaders/planeShapes/circle.glsl"
#include "@/shaders/planeShapes/rectangle.glsl"
#include "@/shaders/planeShapes/triangle.glsl"
#include "@/shaders/planeShapes/octagon.glsl"
#include "@/shaders/planeShapes/hexagon.glsl"

#include "@/shaders/patterns/circle.glsl"
#include "@/shaders/patterns/square.glsl"
#include "@/shaders/patterns/plus.glsl"
#include "@/shaders/patterns/stripe.glsl"
#include "@/shaders/patterns/triangle.glsl"

#include "@/modules/main/shaders/color.glsl"

uniform float opacity;

in vec2 vUv;
in vec4 vColor;
in vec3 vOptions;
in vec2 vShapeOptions;
in vec3 vPatternOptions;

void main()
{
    float finalOpacity = vColor.a * opacity;

    if (finalOpacity <= 0.001) {
        discard;
    }

    float shapeRatio = vShapeOptions.x;
    float borderWidth = vShapeOptions.y;

    float patternCount = vPatternOptions.x;
    float patternScaleRatio = vPatternOptions.y;
    float patternOffset = vPatternOptions.z;

    int shape = int(round(vOptions.x));
    int pattern = int(round(vOptions.z));
    int variant = int(round(vOptions.y));

    float border = borderWidth;
    bool skipCheck = false;

    if (variant == 0) {
        border = max(border, 0.04);
    } else if (variant == 1) {
        border = 0.0;
    } else if (variant == 2) {
        border = 0.0;
        skipCheck = true;
    }

    float shapeStr = 1.0;
    float filledShapeStr = 1.0;

    switch (shape) {
        case 0:
        shapeStr = triangle(vUv, border, shapeRatio);
        filledShapeStr = triangle(vUv, 0.0, shapeRatio);
        break;
        case 1:
        shapeStr = circle(vUv, border, shapeRatio);
        filledShapeStr = circle(vUv, 0.0, shapeRatio);
        break;
        case 2:
        shapeStr = hexagon(vUv, border, shapeRatio);
        filledShapeStr = hexagon(vUv, 0.0, shapeRatio);
        break;
        case 3:
        shapeStr = rectangle(vUv, border, shapeRatio);
        filledShapeStr = rectangle(vUv, 0.0, shapeRatio);
        break;
        case 4:
        shapeStr = octagon(vUv, border, shapeRatio);
        filledShapeStr = octagon(vUv, 0.0, shapeRatio);
        break;
    }

    float patternStr = 1.0;

    switch (pattern) {
        case 0:
        patternStr = trianglePattern(vUv, patternCount, patternScaleRatio);
        break;
        case 1:
        patternStr = circlePattern(vUv, patternCount, patternScaleRatio);
        break;
        case 2:
        patternStr = squarePattern(vUv, patternCount, patternScaleRatio);
        break;
        case 3:
        patternStr = stripePattern(vUv, patternCount, patternScaleRatio);
        break;
        case 4:
        patternStr = plusPattern(vUv, patternCount, patternScaleRatio);
        break;
    }

    if (skipCheck || (shapeStr < 0.5)) {
        patternStr = abs(patternOffset - patternStr);
        if (patternStr > 0.5) {
            discard;
        }

        if (filledShapeStr + patternStr < 0.5) {
            discard;
        }
    }

    gl_FragColor = vec4(normalizeColor(vColor.rgb), finalOpacity);
}
