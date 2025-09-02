<script lang="ts" module>
  import Link from '@/components/Links/Link.svelte'
  import { ROUTES } from '@/lib/constants/routes'

  export const messages = {
    projectArchiveLink,
  }
</script>

{#snippet projectArchiveLink()}
  here
  <Link href={ROUTES.projectArchives.pathname} isExternal>project archive</Link>
{/snippet}
