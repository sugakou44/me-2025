
#include "@/lib/shaders/transform.glsl"
#include "@/modules/main/shaders/wind.glsl"
#include "@/modules/main/shaders/terrain.glsl"

uniform float tick;
uniform float swayFactor;
uniform vec3 diffuseColor;

attribute vec3 leaveOrigin;
attribute float windFactor;

out vec2 vUv;
out vec3 vPosition;

void main()
{
    vec4 transformedSectionOrigin = modelMatrix * instanceMatrix * vec4(leaveOrigin, 1.0);

    vec3 windAxis = getWindAxis(transformedSectionOrigin.xyz, tick);
    float windStrength = getWindStrength(transformedSectionOrigin.xyz, tick);
    float windLeanAngle = windStrength * 0.05 * swayFactor * transformedSectionOrigin.y;

    vec3 localPosition = vec3(position.xyz) + windAxis * windLeanAngle;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(localPosition, 1.0);

    vUv = uv;
    vPosition = position.xyz;
}
