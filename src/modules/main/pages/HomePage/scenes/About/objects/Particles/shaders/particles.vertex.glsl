uniform vec2 resolution;
uniform float size;
uniform sampler2D positionMap;

in vec2 particlesUv;
in float pointSize;
in vec3 color;
in float index;
in float textureIndex;

out float vTextureIndex;
out vec4 vColor;

void main()
{
    vec4 particle = texture(positionMap, particlesUv);

    // Final position
    vec4 mPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 mvPosition = viewMatrix * mPosition;
    vec4 mvpPosition = projectionMatrix * mvPosition;
    gl_Position = mvpPosition;

    // Point size
    float sizeIn = smoothstep(0.0, 0.1, particle.a);
    float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);

    gl_PointSize = min(sizeIn, sizeOut) * pointSize * size;
    gl_PointSize *= (1.0 / -mvPosition.z);

    // Varyings
    vColor = vec4(color, max(sizeIn, sizeOut));
    // vTextureIndex = mod(float(gl_InstanceID), textureCount) + textureOffset;
    vTextureIndex = textureIndex;
}
