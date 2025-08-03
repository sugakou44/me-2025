#include "@/modules/main/shaders/terrain.glsl"

uniform float tick;

out vec2 vUv;
out vec3 vPosition;

void main()
{
    vec3 localPosition = position;

    float terrainHeight = getTerrainHeight(position);
    localPosition.z = terrainHeight;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(localPosition, 1.0);

    vUv = uv;
    vPosition = position;
}
