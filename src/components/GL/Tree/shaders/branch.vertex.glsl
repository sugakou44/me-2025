#include "@/shaders/transform.glsl"
#include "@/modules/main/shaders/wind.glsl"
#include "@/modules/main/shaders/terrain.glsl"

uniform float tick;
uniform float swayFactor;
uniform vec3 diffuseColor;
uniform vec3 treeOrigin;

attribute vec3 sectionOrigin;
attribute float windFactor;

out vec2 vUv;
out vec3 vPosition;

void main()
{
    vec4 modelSectionOrigin = vec4(sectionOrigin, 1.0);

    vec3 localPosition = position;

    float terrainHeight = getTerrainHeight(treeOrigin.xyz);
    localPosition.z += terrainHeight * 5.0;

    vec3 windAxis = getWindAxis(modelSectionOrigin.xyz, tick);
    float windStrength = getWindStrength(modelSectionOrigin.xyz, tick);
    float windLeanAngle = windStrength * 0.008 * swayFactor * modelSectionOrigin.z;

    localPosition = localPosition + windAxis * windLeanAngle;

    vec4 mvpPosition = projectionMatrix * viewMatrix * modelMatrix * vec4(localPosition, 1.0);

    gl_Position = mvpPosition;

    vUv = uv;
    vPosition = position.xyz;
}
