<script lang="ts">
  import { getRobotContent } from '@/lib/utils/metadata'

  const TITLE = 'Saran "Paan" Angsuwan'
  const DESCRIPTION = 'Saran Angsuwan | アングスワン・サラン | ศรัณ อังสุวรรณ'

  const ROBOT = getRobotContent({
    index: true,
    follow: false,
  })

  let { children } = $props()
</script>

<main>
  {@render children()}
</main>
