<script lang="ts">
  import { T } from '@threlte/core'
  import { utils } from 'animejs'
  import {
    CylinderGeometry,
    DataTexture,
    FloatType,
    MeshBasicMaterial,
    RGBAFormat,
    SphereGeometry,
  } from 'three'
  import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
  import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

  import { homeState } from '@/modules/main/contexts/HomeState'

  import { CSEGS, RADIUS, RSEGS, TEXTURE_SIZE } from './constants'
  import fragmentShader from './shaders/fragment.glsl'
  import vertexShader from './shaders/vertex.glsl'
  import { track } from './Track.svelte'
  import { prepareDataPoints } from './utils'

  const points: number[] = []
  const pointsData = track.curve.getSpacedPoints(TEXTURE_SIZE - 1)
  const frenetFramesData = track.curve.computeFrenetFrames(TEXTURE_SIZE - 1)

  prepareDataPoints(points, pointsData)
  prepareDataPoints(points, frenetFramesData.tangents)

  const dataTexture = new DataTexture(
    new Float32Array(points),
    TEXTURE_SIZE,
    2,
    RGBAFormat,
    FloatType,
  )
  dataTexture.needsUpdate = true

  const geometry = mergeGeometries([
    new SphereGeometry(
      RADIUS,
      RSEGS,
      RSEGS * 0.5,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5,
    ).translate(0, 0.5, 0),
    new CylinderGeometry(RADIUS, RADIUS, 1, RSEGS, CSEGS, true),
    new SphereGeometry(
      RADIUS,
      RSEGS,
      RSEGS * 0.5,
      0,
      Math.PI * 2,
      Math.PI * 0.5,
      Math.PI * 0.5,
    ).translate(0, -0.5, 0),
  ]).rotateX(-Math.PI * 0.5)

  const uniforms = {
    curveTexture: {
      value: dataTexture,
    },
    stretchRatio: {
      value: 0,
    },
    pointCount: {
      value: pointsData.length,
    },
  }

  const material = new CustomShaderMaterial({
    transparent: true,
    baseMaterial: MeshBasicMaterial,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    uniforms: uniforms,
    patchMap: {
      '#define CUSTOM_VERTEX': {
        '#include <begin_vertex>': `
          #include <begin_vertex>

          vec3 pos = position;

          vec3 cpos = vec3(0.);
          vec3 ctan = vec3(0.);

          float a = clamp(pos.z + 0.5, 0., 1.) * stretchRatio;
          if(pos.z < -0.5){
            cpos = vec3(texture(curveTexture, vec2(0., 0.25)));
            ctan = vec3(texture(curveTexture, vec2(0., 0.75)));
            pos.z += 0.5;
          } else if(pos.z >= -0.5){
            cpos = vec3(texture(curveTexture, vec2(a, 0.25)));
            ctan = vec3(texture(curveTexture, vec2(a, 0.75)));
            pos.z = (pos.z > 0.5) ? (pos.z - 0.5) : 0.;
          }

          mat3 rot = calcLookAtMatrix(vec3(0), -ctan, 0.);

          vCurrentPos = a;

          transformed = rot * pos;
          transformed += cpos;
        `,
      },
    },
  })
</script>

<T.Group rotation={[utils.degToRad(-90), 0, 0]} position={[0, 0, -10]}>
  <T.Mesh {geometry} frustumCulled={false}>
    <T
      is={material}
      uniforms.stretchRatio.value={homeState.experienceScrollProgress}
    />
  </T.Mesh>
</T.Group>
