<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { SideFooter } from '@/components/Footer'
  import { MainHead } from '@/components/Head'
  import { NameCard } from '@/components/NameCard'
  import {
    DEFAULT_DESCRIPTION,
    DEFAULT_TITLE,
    THEME_COLOR,
  } from '@/lib/constants/seo'
  import { Error500 } from '@/modules/errors/pages/Error500'

  import '@/lib/svelte/lenis.svelte'
  import '../app.css'

  import { ROUTES } from '@/lib/constants/routes'

  let { children } = $props()

  const OG_IMAGE = `${ROUTES.home.href}/og.png`
</script>

<SvelteSeo
  title={DEFAULT_TITLE}
  description={DEFAULT_DESCRIPTION}
  canonical={ROUTES.home.href}
/>

<SvelteSeo
  notranslate
  themeColor={THEME_COLOR}
  manifest={`${ROUTES.home.href}/manifest.json`}
  openGraph={{
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: ROUTES.home.href,
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

<MainHead />
<main>
  <svelte:boundary>
    <NameCard />
    {@render children()}

    {#snippet failed(error)}
      <Error500 {error} />
    {/snippet}
  </svelte:boundary>
</main>

<SideFooter />
