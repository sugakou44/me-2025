
uniform float tick;

uniform sampler2D mainTexture;
uniform sampler2D fadeTexture;
uniform sampler2D epilogueTexture;
uniform float fadeMixFactor;

in vec2 vUv;

void main()
{
    vec4 outColor = vec4(0.0);

    // for (int i = 0; i <= texturesSize; i++) {
    //     vec4 texel = vec4(0.0);
    //     switch (i) {
    //         case 0:
    //         texel = texture(mainTextures[0], vUv);
    //         break;
    //         case 1:
    //         texel = texture(mainTextures[1], vUv);
    //         break;
    //         case 2:
    //         texel = texture(mainTextures[2], vUv);
    //         break;
    //         case 3:
    //         texel = texture(mainTextures[3], vUv);
    //         break;
    //         case 4:
    //         texel = texture(mainTextures[4], vUv);
    //         break;
    //         case 5:
    //         texel = texture(mainTextures[5], vUv);
    //         break;
    //         case 6:
    //         texel = texture(mainTextures[6], vUv);
    //         break;
    //         case 7:
    //         texel = texture(mainTextures[7], vUv);
    //         break;
    //     }
    //     outColor += texel / (float(i) + 5.0);
    // }

    float mixFactor = smoothstep(0.0, 1.0, fadeMixFactor);
    vec4 fadeTexel = texture(fadeTexture, vUv);
    vec4 epilogueTexel = texture(epilogueTexture, vUv);
    vec4 mainTexel = texture(mainTexture, vUv);

    gl_FragColor = mix(mainTexel, epilogueTexel, fadeMixFactor > fadeTexel.g ? 1.0 : 0.0);
}
