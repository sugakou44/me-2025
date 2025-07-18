uniform float tick;
uniform float scale;
uniform float levitation;
uniform vec3 diffuseColor;

in vec3 vPosition;
in vec2 vUv;
in float height;

void main()
{
    gl_FragColor = vec4(vec3(vUv.y), 1.0);
}
