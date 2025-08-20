#include "@/lib/shaders/gradients/rainbowGradient.glsl"

uniform sampler2D curveTexture;
uniform float stretchRatio;
uniform float pointCount;

in float vCurrentPos;

void main()
{
    vec3 gradient = rainbowGradient(vCurrentPos);
    float opacity = stretchRatio * 2.0 - 1.0;
    opacity = 1.0 - pow(opacity, 2.0);
    opacity = smoothstep(0.0, 1.5, opacity);
    csm_FragColor = vec4(gradient.x, 0.7, gradient.z, opacity);
}
