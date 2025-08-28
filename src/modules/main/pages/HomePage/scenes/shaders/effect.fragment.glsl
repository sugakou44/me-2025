
uniform float tick;
uniform float fadeMixFactor;

uniform vec3 diffuse;

uniform sampler2D orthographicTexture;
uniform sampler2D perspectiveTexture;
uniform sampler2D fadeTexture;

in vec2 vUv;

void main()
{
    vec4 outColor = vec4(0.0);

    float mixFactor = smoothstep(0.0, 1.0, fadeMixFactor);
    vec4 fadeTexel = texture(fadeTexture, vUv);
    vec4 orthographicTexel = texture(orthographicTexture, vUv);
    vec4 perspectiveTexel = texture(perspectiveTexture, vUv);

    outColor = perspectiveTexel;
    outColor = mix(orthographicTexel, outColor, outColor.a);
    outColor = mix(vec4(diffuse, 1.0), outColor, outColor.a);

    gl_FragColor = outColor;
}
