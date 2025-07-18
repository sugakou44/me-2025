#include "@/lib/shaders/gradients/rainbowGradient.glsl"
uniform sampler2D curveTexture;
uniform float stretchRatio;

in float vCurrentPos;

void main()
{
    vec3 gradient = rainbowGradient(stretchRatio);
    csm_FragColor = vec4(gradient.x, 0.7, gradient.z, 1.0);
}
