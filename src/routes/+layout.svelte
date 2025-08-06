<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { Footer } from '@/components/Footer'
  import { CONTACT } from '@/lib/constants/contact'
  import {
    DEFAULT_DESCRIPTION,
    DEFAULT_TITLE,
    THEME_COLOR,
  } from '@/lib/constants/seo'
  import { Error500 } from '@/modules/errors/pages/Error500'

  import '../app.css'

  let { children } = $props()

  const OG_IMAGE = `${CONTACT.website.href}/og.png`
</script>

<SvelteSeo
  title={DEFAULT_TITLE}
  description={DEFAULT_DESCRIPTION}
  canonical={CONTACT.website.href}
  notranslate
  themeColor={THEME_COLOR}
  manifest={`${CONTACT.website.href}/manifest.json`}
  openGraph={{
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: CONTACT.website.href,
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
      },
    ],
    site_name: DEFAULT_TITLE,
  }}
/>

<svelte:head>
  <meta property="og:image" content={OG_IMAGE} />
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
