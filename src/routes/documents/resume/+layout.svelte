<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { ROUTES } from '@/lib/constants/routes'
  import { getTitle } from '@/lib/constants/seo'

  let { children } = $props()
</script>

<SvelteSeo
  title={getTitle('Resume | Documents')}
  canonical={ROUTES.resume.pathname}
  noindex
  nofollow
  notranslate
  nositelinkssearchbox
/>

{@render children()}
