<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { Footer } from '@/components/Footer'
  import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/lib/constants/seo'
  import { Error500 } from '@/modules/errors/pages/Error500'

  import '@/lib/svelte/lenis.svelte'
  import '../app.css'

  import { CONTACT } from '@/lib/constants/contact'

  let { children } = $props()
</script>

<SvelteSeo
  title={DEFAULT_TITLE}
  description={DEFAULT_DESCRIPTION}
  canonical={CONTACT.website.href}
  openGraph={{
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: CONTACT.website.href,
    type: 'website',
    images: [
      {
        url: `${CONTACT.website.href}/og.png`,
      },
    ],
    site_name: DEFAULT_TITLE,
  }}
/>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Bitter:ital,wght@0,100..900;1,100..900&family=Caveat+Brush&family=Cherry+Bomb+One&family=Sono:wght,MONO@200..800,0..1&display=block"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <!-- <Curtain /> -->
  <svelte:boundary>
    {@render children()}

    {#snippet failed(error)}
      <Error500 {error} />
    {/snippet}
  </svelte:boundary>
</main>

<Footer />
