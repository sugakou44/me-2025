uniform int segments;
uniform vec3 baseColor;
uniform vec3 tipColor;
uniform float opacity;
uniform sampler2D grassBladeTexture;

in float vSegmentHeight;
in vec3 vCoord;
in vec2 vUv;
in vec3 vNormal;

void main()
{
    vec4 grassTexel = texture(grassBladeTexture, vUv);
    float finalOpacity = grassTexel.a * opacity;

    if (finalOpacity <= 0.001) {
        discard;
    }

    vec3 diffuseColor = mix(baseColor, tipColor, vSegmentHeight);

    grassTexel.xyz += 0.1;

    grassTexel.xyz = normalize(grassTexel.xyz);

    grassTexel.a = finalOpacity;

    gl_FragColor = vec4(mix(diffuseColor, grassTexel.xyz, vSegmentHeight), grassTexel.a);
}
