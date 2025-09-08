#include "@/shaders/math.glsl"
// #include "@/shaders/noises/curl.glsl"

uniform float tick;
uniform float dt;
uniform float forceAttenuation;
uniform float forceFrequency;
uniform float expandFactor;
uniform float enabled;
uniform vec3 origin;
uniform sampler2D initialMap;
uniform sampler2D targetMap;

void main() {
    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;
    vec2 _uv = uv * 2.0 - 1.0;

    vec4 initialPosition = texture(initialMap, uv);

    vec4 targetTexel = texture(targetMap, uv);
    targetTexel.r = targetTexel.r * (expandFactor + 1.0);

    vec4 positionTexel = texture(positionTexture, uv);
    positionTexel.a = positionTexel.a + dt;

    if (positionTexel.a >= 1.01 && enabled > 0.0) {
        // positionTexel.xyz = random3(uv + tick) * 4.0;
        positionTexel.xyz = origin;
        positionTexel.a = mod(positionTexel.a, 1.0);
    } else if (enabled == 0.0) {
        positionTexel = initialPosition;
    } else {
        // vec3 noise = curl(
        //         positionTexel.xyz * forceFrequency + tick
        //     );

        vec3 force = vec3(0.0);

        float currentHeight = positionTexel.z * 10.0;

        // force.z = 3.0 + noise.z;
        // force.x = targetTexel.r * cos(targetTexel.a * TWO_PI) + noise.x * targetTexel.r / 4.4;
        // force.y = targetTexel.r * sin(targetTexel.a * TWO_PI) + noise.y * targetTexel.r / 4.4;
        force.z = 3.0;
        force.x = targetTexel.r * cos(targetTexel.a * TWO_PI);
        force.y = targetTexel.r * sin(targetTexel.a * TWO_PI);

        float smoothfactor = min(smoothstep(0.0, 0.2, positionTexel.z), 1.0 - smoothstep(0.7, 1.0, positionTexel.z));
        force.xy = force.xy * smoothstep(0.0, 0.2, positionTexel.a);

        force = normalize(force) * forceAttenuation;

        positionTexel.xyz = positionTexel.xyz + force.xyz * dt;
    }

    gl_FragColor = positionTexel;
}
