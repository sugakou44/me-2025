<script lang="ts">
  import { page } from '$app/state'

  import { Error404 } from '@/modules/errors/pages/Error404'
  import { Error500 } from '@/modules/errors/pages/Error500'
</script>

{#if page.status === 404}
  <Error404 />
{:else}
  <Error500 />
{/if}
