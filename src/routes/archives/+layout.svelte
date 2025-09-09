<script lang="ts">
  import { Footer } from '@/components/Footer'
  import { Noscript } from '@/components/Noscript'

  let { children } = $props()
</script>

{@render children()}

<Footer />
<Noscript />
