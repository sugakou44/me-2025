<script lang="ts">
  import { T } from '@threlte/core'
  import { eases } from 'animejs'
  import { untrack } from 'svelte'
  import { Tween } from 'svelte/motion'
  import { Color } from 'three'

  import { ChainTween } from '@/lib/animations/motion'
  import { mod, yaw } from '@/lib/utils/math'

  import FragmentShader from './shaders/fragment.glsl'
  import VertexShader from './shaders/vertex.glsl'
  import {
    getDistance,
    getDuration,
    getLevitationLevel,
    getPeakScale,
    getPitchAngle,
    getScale,
    LEVITATION_DELAY_FACTOR,
    LEVITATION_DURATION_FACTOR,
    SCALE_DELAY_FACTOR,
    SCALE_DURATION_FACTOR,
    SCALE_RECOIL_DURATION,
    YAW_DURATION,
  } from './utils'

  // import type { EventMap } from '@threlte/extras'

  const SIZE = 1

  let targetPosition: ArrayAsVector2 = $state.raw([0, 0])

  let preparedToMove = $state(false)
  let isAnimating = $state(false)

  let currentPosition = new Tween([0, 0] as ArrayAsVector2, {
    easing: eases.inOutQuad,
  })
  // let pitchTween = new Tween(0)
  // let rollTween = new Tween(0)
  let yawTween = new Tween(0)

  let levitationTween = ChainTween(0, {
    easing: eases.inOutQuad,
  })
  let scaleTween = ChainTween(1, {
    easing: eases.inOutQuad,
  })

  $effect(() => {
    const origin = untrack(() => currentPosition.current)
    const destination = targetPosition

    const distance = getDistance(origin, destination)
    const isAtTargetLocation = distance <= 0.4

    if (isAnimating || isAtTargetLocation) {
      if (isAtTargetLocation) {
        scaleTween.set(1, {
          duration: SCALE_RECOIL_DURATION,
          easing: eases.outBack(1.2),
        })

        preparedToMove = false
      }
      return
    }

    if (!preparedToMove) {
      isAnimating = true

      scaleTween.set(0.7, { duration: SCALE_RECOIL_DURATION }).then(() => {
        isAnimating = false
        preparedToMove = true
      })

      return
    }

    const pitchAngle = getPitchAngle(distance)
    const yawAngle = yaw(origin, destination)
    const scale = getScale(distance)
    const peakScale = getPeakScale(distance)
    const levitation = getLevitationLevel(distance)

    const duration = getDuration(distance)

    isAnimating = true

    const diffYaw =
      yawAngle -
      mod(
        untrack(() => yawTween.current),
        2 * Math.PI,
      )
    const absDiffYaw = Math.abs(diffYaw)

    const targetYaw =
      absDiffYaw < Math.PI
        ? yawTween.current + diffYaw
        : yawTween.current - Math.sign(diffYaw) * (2 * Math.PI - absDiffYaw)

    yawTween.set(targetYaw, {
      duration: YAW_DURATION,
    })

    levitationTween.setChain(
      [levitation, 0],
      [
        {
          duration: LEVITATION_DURATION_FACTOR * duration,
        },
        {
          delay: LEVITATION_DELAY_FACTOR * duration,
          duration: LEVITATION_DURATION_FACTOR * duration,
        },
      ],
    )

    scaleTween.setChain(
      [scale, peakScale, scale, 0.7],
      [
        {
          duration: SCALE_DURATION_FACTOR * duration * 1.2,
          easing: eases.inQuad,
        },
        {
          duration: SCALE_DURATION_FACTOR * duration * 0.8,
          easing: eases.outQuad,
        },
        {
          delay: SCALE_DELAY_FACTOR * duration,
          duration: SCALE_DURATION_FACTOR * duration * 1.2,
          easing: eases.inQuad,
        },
        {
          duration: SCALE_DURATION_FACTOR * duration * 0.8,
          easing: eases.outQuad,
        },
      ],
    )

    const distanceX = distance * Math.cos(yawAngle)
    const distanceY = distance * Math.sin(yawAngle)
    currentPosition
      .set([origin[0] + distanceX, origin[1] + distanceY] as const, {
        duration,
      })
      .then(() => {
        isAnimating = false
      })
  })

  const uniformsBody = {
    diffuseColor: {
      value: new Color(0x66ff00),
    },
    tick: {
      value: 0,
    },
    scale: {
      value: 0,
    },
    levitation: {
      value: 0,
    },
  }

  const uniformsEye = {
    diffuseColor: {
      value: new Color(0xffffff),
    },
    tick: {
      value: 0,
    },
    scale: {
      value: 0,
    },
    levitation: {
      value: 0,
    },
  }

  const planeScale = $derived(2 - scaleTween.current)
</script>

<!-- <T.Mesh
  position={[0, 0, 0]}
  onclick={(event: EventMap['onclick']) => {
    const { point } = event

    targetPosition = [point.x, point.y] as const
  }}
>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshToonMaterial color="red" />
</T.Mesh> -->

<T.Group
  scale={[planeScale, planeScale, scaleTween.current]}
  position={[
    currentPosition.current[0],
    currentPosition.current[1],
    levitationTween.current,
  ]}
  rotation={[0, 0, yawTween.current]}
>
  <T.Mesh position={[SIZE, 0, SIZE]}>
    <T.SphereGeometry args={[SIZE * 0.1, 32, 32]} />
    <T.ShaderMaterial
      vertexShader={VertexShader}
      fragmentShader={FragmentShader}
      uniforms={uniformsEye}
      uniforms.diffuseColor.value={0xffff00}
    />
  </T.Mesh>
  <T.Mesh position={[0, 0, SIZE]}>
    <T.SphereGeometry args={[SIZE, 32, 32]} />
    <T.ShaderMaterial
      vertexShader={VertexShader}
      fragmentShader={FragmentShader}
      uniforms={uniformsBody}
    />
  </T.Mesh>
</T.Group>
