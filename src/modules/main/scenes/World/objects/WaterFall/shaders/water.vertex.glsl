uniform float tick;
uniform vec3 diffuseColor;
uniform vec2 center;
uniform sampler2D displacementMap;

out vec2 vUv;
out vec3 vPosition;
out float vDisplacement;

void main()
{
    vec2 uv2 = (uv * 2.0 - 1.0) - center;
    vec2 absUv = abs(uv2 * 4.0);

    vec4 displacement = texture2D(displacementMap, uv);
    vDisplacement = displacement.x;

    vec4 mPosition = modelMatrix * vec4(position, 1.0);
    mPosition.z += vDisplacement;

    vec4 mvPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvPosition;

    vUv = uv;
    vPosition = gl_Position.xyz;
}
