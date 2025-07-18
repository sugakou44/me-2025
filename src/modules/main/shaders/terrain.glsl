#include "@/lib/shaders/math.glsl"
#include "@/lib/shaders/noises/snoise.glsl"

float getTerrainHeight(vec3 worldPos) {
    return mapRangeUv(snoise(worldPos.xy * 0.05));
}
