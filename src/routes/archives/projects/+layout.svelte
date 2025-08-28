<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { ROUTES } from '@/lib/constants/routes'
  import { getTitle } from '@/lib/constants/seo'
  import { windowState } from '@/lib/contexts/Window'

  let { children } = $props()
</script>

{#if windowState.pathname === ROUTES.projectArchives.pathname}
  <SvelteSeo
    title={getTitle('Projects | Archives')}
    canonical={ROUTES.projectArchives.href}
    notranslate
  />
{/if}

{@render children()}
