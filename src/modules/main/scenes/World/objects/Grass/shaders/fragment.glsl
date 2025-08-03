uniform int segments;
uniform vec3 baseColor;
uniform vec3 tipColor;
uniform float opacity;

in float vSegmentHeight;
in vec3 vCoord;
in vec2 vUv;
in vec3 vNormal;

void main()
{
    gl_FragColor = vec4(mix(baseColor, tipColor, vSegmentHeight), opacity);
}
