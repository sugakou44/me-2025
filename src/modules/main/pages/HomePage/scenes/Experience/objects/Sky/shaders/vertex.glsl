out vec2 vUv;
out vec3 vMPosition;

void main()
{
    vec4 mPosition = modelMatrix * vec4(position, 1.0);

    vec4 mvpPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvpPosition;

    vUv = uv;
    vMPosition = position.xyz;
}
