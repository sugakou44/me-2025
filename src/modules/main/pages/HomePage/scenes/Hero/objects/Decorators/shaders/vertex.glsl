
in vec3 color;
in float baseOpacity;
in vec3 options;
in vec2 shapeOptions;
in vec3 patternOptions;

out vec2 vUv;
out vec4 vColor;
out vec3 vOptions;
out vec2 vShapeOptions;
out vec3 vPatternOptions;

void main()
{
    vec4 mPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vec4 mvpPosition = projectionMatrix * viewMatrix * mPosition;
    gl_Position = mvpPosition;

    vUv = uv;
    vColor = vec4(color, baseOpacity);
    vOptions = options;
    vShapeOptions = shapeOptions;
    vPatternOptions = patternOptions;
}
