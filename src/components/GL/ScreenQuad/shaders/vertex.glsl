out vec2 vUv;

void main() {
    vUv = 0.5 * (position.xy + 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
