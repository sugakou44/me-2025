
#include "@/lib/shaders/transform.glsl"
#include "@/modules/main/shaders/wind.glsl"
#include "@/modules/main/shaders/terrain.glsl"

uniform float tick;
uniform float swayFactor;
uniform vec3 diffuseColor;

attribute vec3 sectionOrigin;
attribute float windFactor;

out vec2 vUv;
out vec3 vPosition;

void main()
{
    vec4 modelSectionOrigin = modelMatrix * vec4(sectionOrigin, 1.0);

    vec3 windAxis = getWindAxis(modelSectionOrigin.xyz, tick);
    float windStrength = getWindStrength(modelSectionOrigin.xyz, tick);
    float windLeanAngle = windStrength * 0.05 * swayFactor * modelSectionOrigin.z;

    vec3 localPosition = position + windAxis * windLeanAngle;

    float terrainHeight = getTerrainHeight(modelSectionOrigin.xyz);
    localPosition.z += terrainHeight * 5.0;

    vec4 mvpPosition = projectionMatrix * viewMatrix * modelMatrix * vec4(localPosition, 1.0);

    gl_Position = mvpPosition;

    vUv = uv;
    vPosition = position.xyz;
}
