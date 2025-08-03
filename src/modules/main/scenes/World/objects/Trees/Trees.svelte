<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Color } from 'three'

  import { getTick } from '@/lib/three/frame'

  import { Tree } from './Tree'

  interface Props {
    opacity?: number
  }

  let { opacity = 1 }: Props = $props()

  let trees: Tree[] = []

  const BOUND = 16
  const TOTAL_COLUMN = 3
  const SPACE = BOUND / TOTAL_COLUMN
  const COLORS = [
    new Color(0xff696c),
    new Color(0xc5a761),
    new Color(0x91e0ce),
    new Color(0xff696c),
  ]

  for (let i = 8; i > 0; i--) {
    const tree = new Tree()

    tree.options.seed = i
    tree.rng.setSeed(tree.options.seed)

    // const colorIndex = Math.round(tree.rng.random(3, 0))

    // Set parameters
    // tree.options.leaves.type = Math.random() > 0.5 ? 'quad' : 'sphere'
    tree.options.blob.tint = COLORS[2]
    // tree.options.trunk.length = 20
    // tree.options.branch.levels = 3

    // Generate tree and add to your Three.js scene
    tree.generate()

    const col = i % TOTAL_COLUMN
    const row = Math.floor(i / TOTAL_COLUMN)

    let min = col * SPACE - BOUND / 2
    let max = min + SPACE
    tree.translateX(tree.rng.random(max, min))

    min = row * SPACE - BOUND / 2
    max = min + SPACE
    tree.translateY(tree.rng.random(max, min))

    trees.push(tree)
  }

  useTask(() => {
    const tick = getTick()

    trees.forEach((tree) => {
      tree.update(tick, opacity)
    })
  })
</script>

<!-- {#each { length: 20 }, rank}
  <T.Mesh position={[0, 0, rank]}>
    <T.PlaneGeometry args={[4, 4, 1, 1]} />
    <T.MeshBasicMaterial color={0x0a0a0a * rank} />
  </T.Mesh>
{/each} -->

{#each trees as tree, index (index)}
  <T is={tree} />
{/each}
