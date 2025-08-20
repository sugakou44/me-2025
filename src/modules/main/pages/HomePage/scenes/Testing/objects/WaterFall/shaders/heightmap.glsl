#include "@/lib/shaders/math.glsl"

uniform vec2 objectPos;
uniform float objectSize;
uniform float viscosity;

void main() {
    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;

    float distanceFromCenter = 1.0 - distance(uv, vec2(0.5));

    vec2 uv = (vUv * 2.0 - 1.0) - center;
    vec2 absUv = abs(uv * 4.0);
    float height = abs(fract(length(absUv) - tick) - 0.5) * 2.0;

    height = smoothstep(0.0, 1.0, height);
    // heightmapValue.x == height from previous frame
    // heightmapValue.y == height from penultimate frame
    // heightmapValue.z, heightmapValue.w not used
    vec4 heightmapValue = texture2D(heightmap, uv);

    // Get neighbours
    vec4 north = texture2D(heightmap, uv + vec2(0.0, cellSize.y));
    vec4 south = texture2D(heightmap, uv + vec2(0.0, -cellSize.y));
    vec4 east = texture2D(heightmap, uv + vec2(cellSize.x, 0.0));
    vec4 west = texture2D(heightmap, uv + vec2(-cellSize.x, 0.0));

    //float newHeight = ( ( north.x + south.x + east.x + west.x ) * 0.5 - heightmapValue.y ) * viscosity;
    float newHeight = ((north.x + south.x + east.x + west.x) * 0.5 - heightmapValue.y) * viscosity;

    // Mouse influence
    float mousePhase = clamp(length((uv - vec2(0.5)) * BOUNDS - vec2(objectPos.x, -objectPos.y)) * PI / (objectSize), 0.0, PI);
    //newHeight += ( cos( mousePhase ) + 1.0 ) * 0.28 * 10.0;
    newHeight -= (cos(mousePhase) + 1.0) * DEPTH * distanceFromCenter;

    newHeight *= distanceFromCenter;

    heightmapValue.y = heightmapValue.x;
    heightmapValue.x = newHeight;

    gl_FragColor = heightmapValue;
}
