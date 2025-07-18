
uniform float tick;
uniform vec3 diffuseColor;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    gl_FragColor = vec4(diffuseColor, 1.0);
}
