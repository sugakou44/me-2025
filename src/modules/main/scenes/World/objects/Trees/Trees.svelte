<script lang="ts">
  import { T, useTask } from '@threlte/core'

  import { getTick } from '@/lib/three/frame'

  import { Tree } from './Tree'

  let trees: Tree[] = []

  for (let i = 0; i < 10; i++) {
    const tree = new Tree()

    // Set parameters
    // tree.options.leaves.type = Math.random() > 0.5 ? 'quad' : 'sphere'
    tree.options.seed = i
    // tree.options.trunk.length = 20
    // tree.options.branch.levels = 3

    // Generate tree and add to your Three.js scene
    tree.generate()
    tree.translateX(i * 10)

    trees.push(tree)
  }

  useTask(() => {
    const tick = getTick()

    trees.forEach((tree) => {
      tree.update(tick)
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
