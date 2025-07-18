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

  import { useDocumentScrollProgress } from '@/lib/svelte/document.svelte'
  import { cameraTrack } from '@/modules/main/contexts/AppState'

  import { CSEGS, RADIUS, RSEGS, TEXTURE_SIZE } from './constants'
  import fragmentShader from './shaders/fragment.glsl'
  import vertexShader from './shaders/vertex.glsl'
  import { prepareDataPoints } from './utils'

  const dataTexture = $derived.by(() => {
    const points: number[] = []
    const pointsData = cameraTrack.curve.getSpacedPoints(TEXTURE_SIZE - 1)
    const frenetFramesData = cameraTrack.curve.computeFrenetFrames(
      TEXTURE_SIZE - 1,
    )

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

    return dataTexture
  })

  const { geometry, material } = $derived.by(() => {
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

            vCurrentPos = clamp(pos.z + 0.5, 0., 1.);

            transformed = rot * pos;
            transformed += cpos;
          `,
        },
      },
    })

    return {
      geometry,
      material,
    }
  })

  const scroll = useDocumentScrollProgress()
</script>

<T.Group rotation={[utils.degToRad(-90), 0, 0]} position={[0, 0, -2]}>
  <T.Mesh {geometry} frustumCulled={false}>
    <T is={material} uniforms.stretchRatio.value={scroll().progress} />
  </T.Mesh>
</T.Group>
