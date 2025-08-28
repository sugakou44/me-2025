#include "@/lib/shaders/math.glsl"
#include "./pattern.fragment.glsl"
#include "./shape.fragment.glsl"

uniform float patternCount;
uniform float patternScaleRatio;
uniform float patternOffset;

uniform float shapeRatio;
uniform float borderWidth;

uniform vec3 color;
uniform float opacity;

in vec2 vCoord;
in vec2 vUv;

void main()
{
    if (opacity <= 0.001) {
        discard;
    }

    float border = borderWidth;
    bool skipCheck = false;
    #if defined(VARIANT_SOLID)
    border = 0.0;
    #elif defined(VARIANT_OUTLINE)
    border = max(border, 0.04);
    #elif defined(VARIANT_GHOST)
    border = 0.0;
    skipCheck = true;
    #endif

    if (skipCheck || (shape(vUv, border, shapeRatio) < 0.5)) {
        float patternStrength = pattern(vUv, patternCount, patternScaleRatio);
        patternStrength = abs(patternOffset - patternStrength);
        if (patternStrength > 0.5) {
            discard;
        }

        float filledShapeStrength = shape(vUv, 0.0, shapeRatio);
        if (filledShapeStrength + patternStrength < 0.5) {
            discard;
        }
    }

    gl_FragColor = vec4(color, opacity);
}
