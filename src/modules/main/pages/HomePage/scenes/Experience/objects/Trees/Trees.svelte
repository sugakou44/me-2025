<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Outlines } from '@threlte/extras'
  import { utils } from 'animejs'

  import { Tree } from '@/components/GL/Tree'
  import { getTick } from '@/lib/three/frame'
  import { COLORS } from '@/modules/main/constants/colors'

  import type { Texture } from 'three'

  interface Props {
    opacity?: number
    texture?: Texture
  }

  let { opacity = 1, texture }: Props = $props()

  const trees: Tree[] = new Array(18).fill(0).map((position, index) => {
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

    tree.translateX(utils.random(-5, 30, 100))
    tree.translateY(1)

    return tree
  })

  useTask(() => {
    const tick = getTick()

    trees.forEach((tree) => {
      tree.update(tick, opacity)
    })
  })
</script>

<T.Group position={[0.2, 0, 0]}>
  {#each trees as tree, index (index)}
    <T is={tree}>
      <Outlines color="white" thickness={4} />
    </T>
  {/each}
</T.Group>
