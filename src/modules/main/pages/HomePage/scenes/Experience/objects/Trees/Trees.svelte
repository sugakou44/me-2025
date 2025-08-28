<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { utils } from 'animejs'

  import {
    Instance,
    InstancedMesh,
  } from '@/components/GL/InstancedUniformsMesh'
  import { Tree } from '@/components/GL/Tree'
  import { getTick } from '@/lib/three/frame'
  import { COLORS } from '@/modules/main/constants/colors'

  import type { Texture } from 'three'

  interface Props {
    opacity?: number
    texture?: Texture
  }

  let { opacity = 1, texture }: Props = $props()

  const trees: Tree[] = new Array(20).fill(0).map((_, index) => {
    const tree = new Tree()

    tree.options.seed = index

    if (texture) {
      tree.options.bark.texture = texture
    }

    tree.rng.setSeed(tree.options.seed)

    // const colorIndex = Math.round(tree.rng.random(3, 0))

    // Set parameters
    // tree.options.leaves.type = Math.random() > 0.5 ? 'quad' : 'sphere'
    tree.options.blob.tint = COLORS.primary
    // tree.options.trunk.length = 20
    // tree.options.branch.levels = 3

    // Generate tree and add to your Three.js scene
    tree.generate()

    tree.translateX(utils.random(-5, 30, 4))
    tree.translateY(1)
    tree.translateY(utils.random(10, 50, 4) * (Math.random() > 0.5 ? 1 : -1))

    return tree
  })

  useTask(() => {
    const tick = getTick()

    trees.forEach((tree) => {
      tree.update(tick, opacity)
    })
  })
</script>

<T.Group position={[0.2, 0, 0]} dispose={false}>
  {#each trees as tree, i (i)}
    <T is={tree} />
  {/each}
  <!-- {#each trees as tree, i (i)}
    {@const branchId = `branch-${i}`}
    {@const leaveId = `leave-${i}`}
    <InstancedMesh id={branchId}>
      <T is={tree.branchesMesh.geometry} />
      <T is={tree.branchesMesh.material} />
      <InstancedMesh id={leaveId}>
        <T is={tree.leavesMesh.geometry} />
        <T is={tree.leavesMesh.material} />
        {#each { length: 5 } as _, j (j)}
          {@const x = utils.random(-5, 30, 4)}
          {@const z = utils.random(10, 50, 4) * (Math.random() > 0.5 ? 1 : -1)}
          <T.Group position.x={x} position.y={z} scale={tree.options.scale}>
            <Instance id={branchId} />
            <Instance id={leaveId} />
          </T.Group>
        {/each}
      </InstancedMesh>
    </InstancedMesh>
  {/each} -->
</T.Group>
