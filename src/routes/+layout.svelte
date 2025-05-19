<script lang="ts">
  import '../app.css'

  import { Footer } from '@/components/Footer'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Caveat+Brush&family=Cherry+Bomb+One&family=Sono:wght,MONO@200..800,0..1&display=block"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  {@render children()}
</main>

<Footer />
