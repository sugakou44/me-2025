out vec2 vUv;

void main()
{
    vUv = uv;

    vec4 mPosition = modelMatrix * vec4(position, 1.0);
    vec4 mvpPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvpPosition;
}
