uniform float tick;
uniform float scale;
uniform float levitation;
uniform vec3 diffuseColor;

out vec2 vUv;
out vec3 vPosition;

void main()
{
    vec3 outPosition = position;
    vec4 mPosition = modelMatrix * vec4(outPosition, 1.0);
    vec4 mvPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvPosition;

    vUv = uv;
    vPosition = position.xyz;
}
