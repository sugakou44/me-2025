<script lang="ts" module>
  export const messages = {
    currentStack,
    pastStack,
  }
</script>

{#snippet currentStack()}
  <ul>
    <li>react - nextjs</li>
    <li>svelte ❤️</li>
    <li>three.js</li>
    <li>react native</li>
  </ul>
{/snippet}

{#snippet pastStack()}
  <ul>
    <li>react - gatsby</li>
    <li>golang - echo</li>
    <li>express & nestjs</li>
    <li>opencv</li>
    <li>docker & docker compose</li>
  </ul>
{/snippet}
