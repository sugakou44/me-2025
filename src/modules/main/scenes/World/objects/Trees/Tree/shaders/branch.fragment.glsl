
uniform float tick;
uniform vec3 diffuseColor;
uniform float opacity;

in vec3 vPosition;
in vec2 vUv;

void main()
{
    vec3 color = mix(vec3(1.0), diffuseColor, smoothstep(0.0, 20.0, vPosition.z));
    gl_FragColor = vec4(color, opacity);
}
