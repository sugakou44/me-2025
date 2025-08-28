
vec3 normalizeColorWithOffset(vec3 color, float offset) {
    vec3 outColor = color;
    outColor = normalize(outColor + offset) + offset;

    return outColor;
}

vec3 normalizeColor(vec3 color) {
    return normalizeColorWithOffset(color, 0.18);
}
