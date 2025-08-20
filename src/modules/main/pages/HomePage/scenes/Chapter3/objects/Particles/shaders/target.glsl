#include "@/lib/shaders/math.glsl"
#include "@/lib/shaders/noises/curl.glsl"

uniform float tick;
uniform float dt;
uniform sampler2D positionMap;

void main() {
    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;

    vec4 targetTexel = texture(targetTexture, uv);
    vec4 positionTexel = texture(positionMap, uv);

    if (positionTexel.a >= 1.0) {
        targetTexel.r = random(vec2(tick));
        targetTexel.a = random(uv + tick);
    }

    gl_FragColor = targetTexel;
}
