uniform float opacity;
uniform float count;

in vec4 vColor;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);

    if (distanceToCenter > 0.5)
        discard;

    vec4 outColor = vColor;
    outColor.a = outColor.a * opacity;
    outColor.xyz = normalize(outColor.xyz + 0.28) + 0.28;

    gl_FragColor = outColor;
}
