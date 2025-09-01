<script lang="ts">
  import { T } from '@threlte/core'
  import { Outlines } from '@threlte/extras'
  import { SkeletonUtils } from 'three/examples/jsm/Addons.js'

  import type { Bone, MeshStandardMaterial, SkinnedMesh } from 'three'

  interface Props {
    gltf: any
    ref?: SkinnedMesh
    opacity?: number
  }

  let { gltf, ref = $bindable<SkinnedMesh>(), opacity }: Props = $props()

  let skinnedMesh: SkinnedMesh | undefined
  let rootJoint: Bone | undefined

  const clone = SkeletonUtils.clone(gltf.scene)

  clone.traverse((object: any) => {
    if (object.name === 'Object_7') {
      skinnedMesh = object as SkinnedMesh
      const currentMaterial = skinnedMesh.material as MeshStandardMaterial
      currentMaterial.dispose()
    }
    if (object.name === '_rootJoint') {
      rootJoint = object
    }
  })
</script>

{#if rootJoint}
  <T is={rootJoint} />
{/if}
{#if skinnedMesh}
  <T bind:ref is={skinnedMesh} scale={0.001}>
    <T.MeshToonMaterial
      transparent
      {opacity}
      map={gltf.materials.HeZiTou.map}
      roughness={0}
      metalness={0}
    />
    <Outlines color="white" thickness={4} {opacity} transparent />
  </T>
{/if}
