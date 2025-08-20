<script lang="ts">
  import { T, useTask } from '@threlte/core'

  import { getTick } from '@/lib/three/frame'
  import { COLORS } from '@/modules/main/constants/colors'

  import { Tree } from './Tree'

  interface Props {
    opacity?: number
  }

  let { opacity = 1 }: Props = $props()

  let trees: Tree[] = []

  const BOUND = 15
  const TOTAL_COLUMN = 5
  const SPACE = BOUND / TOTAL_COLUMN

  for (let i = 8; i > 0; i--) {
    const tree = new Tree()

    tree.options.seed = i
    tree.rng.setSeed(tree.options.seed)

    // const colorIndex = Math.round(tree.rng.random(3, 0))

    // Set parameters
    // tree.options.leaves.type = Math.random() > 0.5 ? 'quad' : 'sphere'
    tree.options.blob.tint = COLORS.primary
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

<T.Group position={[0.2, 0, 0]}>
  {#each trees as tree, index (index)}
    <T is={tree}></T>
  {/each}
</T.Group>
