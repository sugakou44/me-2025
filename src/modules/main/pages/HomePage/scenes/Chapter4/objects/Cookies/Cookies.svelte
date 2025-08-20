<script lang="ts">
  import { T } from '@threlte/core'
  import {
    InstancedMeshes,
    useDraco,
    useGltf,
    useGltfAnimations,
    useSuspense,
  } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { asset } from '$app/paths'
  import { utils } from 'animejs'
  import { Tween } from 'svelte/motion'
  import { Group } from 'three'

  import type { Props } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import type * as THREE from 'three'

  let {
    fallback,
    error,
    children,
    ref = $bindable(),
    isIn = false,
    ...props
  }: Props<THREE.Group> & {
    ref?: THREE.Group
    children?: Snippet<[{ ref: THREE.Group }]>
    fallback?: Snippet
    error?: Snippet<[{ error: Error }]>
    isIn?: boolean
  } = $props()

  ref = new Group()

  type ActionName = 'CylinderAction'
  interface GLTFResult {
    nodes: {
      Object_6: THREE.Mesh
      Object_7: THREE.Mesh
      Object_8: THREE.Mesh
      Object_9: THREE.Mesh
      Object_4: THREE.Mesh
    }
    materials: {
      ['Chocolate.004']: THREE.MeshStandardMaterial
      ['Chocolate.001']: THREE.MeshStandardMaterial
      ['Chocolate.002']: THREE.MeshStandardMaterial
      ['Chocolate.003']: THREE.MeshStandardMaterial
      ['Material.001']: THREE.MeshStandardMaterial
    }
  }

  const dracoLoader = useDraco()
  const suspend = useSuspense()
  const gltfPromise = suspend(
    useGltf<GLTFResult>(asset('/models/cookie-transformed.glb'), {
      dracoLoader,
    }),
  )

  export const { actions, mixer } = useGltfAnimations<ActionName>(
    gltfPromise,
    ref,
  )

  const angularDamping = new Tween(1)

  $effect(() => {
    if (isIn) {
      angularDamping.set(44, {
        duration: 44444,
      })
    }
  })
</script>

<T is={ref} dispose={false} {...props}>
  {#if isIn}
    <!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
    {#await gltfPromise}
      {@render fallback?.()}
    {:then gltf}
      <InstancedMeshes meshes={gltf.nodes}>
        {#snippet children({
          components: { Object_6, Object_7, Object_8, Object_4 },
        })}
          {#snippet cookie(props?: Props<typeof Group>)}
            <T.Group {...props}>
              <T.Group rotation={[Math.PI / 2, 0, 0]}>
                <RigidBody
                  type="dynamic"
                  angularDamping={angularDamping.current}
                >
                  <Collider
                    shape="cylinder"
                    args={[0.01, 1.2]}
                    contactForceEventThreshold={30}
                    restitution={0.4}
                    mass={1}
                  />
                  <Collider
                    shape="cylinder"
                    args={[0.1, 1.0]}
                    contactForceEventThreshold={30}
                    restitution={0.4}
                    mass={4}
                  />
                  <T.Group rotation={[0, 0, 0]} scale={20}>
                    <T.Group
                      name="cookie-chocolate"
                      position={[-0.03, 0.004, 0.05]}
                      rotation={[0.61, 0.1, 0.15]}
                    >
                      <Object_6 material={gltf.materials['Chocolate.004']} />
                      <Object_7 material={gltf.materials['Chocolate.001']} />
                      <Object_8 material={gltf.materials['Chocolate.002']} />
                    </T.Group>
                    <Object_4 material={gltf.materials['Material.001']} />
                  </T.Group>
                </RigidBody>
              </T.Group>
            </T.Group>
          {/snippet}
          {#each { length: 100 }}
            {@render cookie({
              position: [
                utils.random(-10, 10, 2),
                utils.random(-10, 10, 2),
                utils.random(10, 40, 2),
              ],
              rotation: [
                utils.random(-Math.PI / 2, Math.PI / 2, 2),
                utils.random(-Math.PI / 2, Math.PI / 2, 2),
                utils.random(-Math.PI / 2, Math.PI / 2, 2),
              ],
            })}
          {/each}
        {/snippet}
      </InstancedMeshes>
    {:catch err}
      {@render error?.({ error: err })}
    {/await}
  {/if}
  {@render children?.({ ref })}
</T>
