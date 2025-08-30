#include <common>

#include "@/shaders/math.glsl"
#include "@/shaders/hash.glsl"
#include "@/shaders/easing.glsl"
#include "@/shaders/bezier2c.glsl"
#include "@/shaders/transform.glsl"
#include "@/shaders/bezierGradient.glsl"
#include "@/shaders/noises/snoise.glsl"

#include "@/modules/main/shaders/terrain.glsl"
#include "@/modules/main/shaders/wind.glsl"
uniform vec3 center;
uniform int segments;
uniform int vertices;
uniform float bladeWidth;
uniform float bladeHeight;
uniform float patchSize;
uniform float swayFactor;
uniform float tick;

out float vSegmentHeight;
out vec3 vCoord;
out vec2 vUv;
out vec3 vNormal;

void main() {
    vec2 hashedInstanceID = hash21(float(gl_InstanceID)) * 2.0 - 1.0;
    vec3 bladeOffset = vec3(hashedInstanceID.x, hashedInstanceID.y, 0.0) * patchSize;

    float terrainHeight = getTerrainHeight(bladeOffset + center);
    bladeOffset.z += terrainHeight;

    // vec3 bladeWorldPos = (modelMatrix * vec4(bladeOffset, 1.0)).xyz;
    vec3 bladeWorldPos = bladeOffset;

    vec3 hashVal = hash(bladeWorldPos);

    float heightFactor = 1.0 - hashVal.y * 0.5;

    // rotation
    float angle = mapRange(hashVal.x, -1.0, 1.0, -PI, PI);

    // position
    float vertID = mod(float(gl_VertexID), float(vertices * 2));
    float frontVertID = mod(vertID, float(vertices));

    // 0 = left, 1 = right
    float isOddVertID = mod(frontVertID, 2.0);
    float side = (vertID >= float(vertices)) ? 1.0 : -1.0;

    float segmentHeight = (float(frontVertID) - isOddVertID) / (float(segments * 2));

    // float width = bladeWidth * easeOut(1.0 - segmentHeight, 4.0) * heightFactor;
    // float width = bladeWidth * smoothstep(0.0, 0.25, 1.0 - segmentHeight);
    float width = bladeWidth;
    float height = bladeHeight * heightFactor;

    vec3 vertPosition = vec3(
            (isOddVertID - 0.5) * width,
            0.0,
            segmentHeight * height);

    vUv = vec2(isOddVertID, segmentHeight);

    // wind
    vec3 windAxis = getWindAxis(bladeWorldPos, tick);
    float windStrength = getWindStrength(bladeWorldPos, tick);
    float windLeanAngle = windStrength * 1.5 * segmentHeight * swayFactor;

    // lean
    float leanFactorRandomCoeff = snoise(vec3(bladeWorldPos.xz, tick * 0.4)) * (windStrength * 0.5 + 0.125);
    float leanFactor = mapRange(hashVal.z, -1.0, 1.0, -0.5, 0.5) + leanFactorRandomCoeff;

    vec3 p1 = vec3(0.0);
    vec3 p2 = vec3(0.0, 0.0, 0.33);
    vec3 p3 = vec3(0.0, 0.0, 0.66);
    vec3 p4 = vec3(0.0, sin(leanFactor), cos(leanFactor));
    vec3 curve = bezier2c(p1, p2, p3, p4, segmentHeight);
    vec3 curveGradient = bezierGradient(p1, p2, p3, p4, segmentHeight);

    // transform
    vertPosition.y = curve.y * height;
    vertPosition.z = curve.z * height;

    mat3 transformMatrix = rotateAxis(windAxis, windLeanAngle) * rotateAxis(vec3(0.0, 0.0, 1.0), angle);

    vec3 localPosition = transformMatrix * vertPosition + bladeOffset;
    vec3 localNormal = transformMatrix * vec3(0.0, mat2(0.0, 1.0, -1.0, 0.0) * -side * curveGradient.zy);
    vec4 mvPosition = modelViewMatrix * vec4(localPosition, 1.0);

    // Blend normal
    float distanceBlend = smoothstep(
            0.0, 10.0, distance(cameraPosition, bladeWorldPos));
    localNormal = mix(localNormal, vec3(0.0, 1.0, 0.0), distanceBlend * 0.5);
    localNormal = normalize(localNormal);

    // thinken blade when almost out of view
    vec3 viewDirection = normalize(cameraPosition - bladeWorldPos);
    vec3 faceNormal = (transformMatrix * vec3(0.0, side, 0.0));
    float viewDotNormal = saturate(dot(faceNormal, viewDirection));
    float viewSpaceThickenFactor = easeOut(
            1.0 - viewDotNormal, 4.0) * smoothstep(0.0, 0.2, viewDotNormal);

    mvPosition.x += viewSpaceThickenFactor * (isOddVertID - 0.5) * width * 0.5 * -side;

    gl_Position = projectionMatrix * mvPosition;

    gl_Position.w = heightFactor < 0.25 ? 0.0 : gl_Position.w;
    vSegmentHeight = segmentHeight;
    vNormal = normalize((modelMatrix * vec4(localNormal, 0.0)).xyz);
    vCoord = (modelMatrix * vec4(localPosition, 1.0)).xyz;
}
