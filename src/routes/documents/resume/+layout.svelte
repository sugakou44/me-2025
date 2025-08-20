<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { ROUTES } from '@/lib/constants/routes'
  import { getTitle } from '@/lib/constants/seo'
  import { windowState } from '@/lib/contexts/Window'

  let { children } = $props()
</script>

{#if windowState.pathname === ROUTES.resume.pathname}
  <SvelteSeo
    title={getTitle('Resume | Documents')}
    canonical={ROUTES.resume.href}
    noindex
    nofollow
    notranslate
    nositelinkssearchbox
  />
{/if}

{@render children()}
