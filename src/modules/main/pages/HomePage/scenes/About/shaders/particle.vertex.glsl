#include "@/shaders/transform.glsl"
#include "@/shaders/noises/snoise.glsl"
#include "@/shaders/noises/curl.glsl"

uniform float tick;
uniform float opacity;
uniform float textureOffset;
uniform float textureCount;

in vec3 instanceOrigin;
in float instanceSize;
in float instanceAngle;

out vec2 vUv;
out vec3 vColor;
out float vIndex;

void main()
{
    vUv = uv;

    float rotationNoise = snoise(instanceOrigin + tick * 0.4);
    vec2 positionNoise = curl(instanceOrigin.xy * 100.0 + tick * 0.1);
    float rotateSpeed = rotationNoise * opacity * 0.01;
    vec3 pos = position;
    pos *= rotateAxis(vec3(0.0, 0.0, 1.0), instanceAngle + tick * rotateSpeed);
    pos *= instanceSize;
    pos += 0.5 * vec3(positionNoise * smoothstep(-0.5, 0.5, length(positionNoise)), 0.0);

    vec4 mPosition = modelMatrix * instanceMatrix * vec4(pos, 1.0);
    mPosition = mPosition + vec4(instanceOrigin, 0.0);
    vec4 mvpPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvpPosition;

    vColor = instanceColor;

    vIndex = mod(float(gl_InstanceID), textureCount) + textureOffset;
}
