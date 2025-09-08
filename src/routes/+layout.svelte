<script lang="ts">
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import SvelteSeo from 'svelte-seo'

  import { SideFooter } from '@/components/Footer'
  import { MainHead } from '@/components/Head/MainHead'
  import { NameCard } from '@/components/NameCard'
  import { IS_DEV } from '@/lib/constants'
  import { ROUTES } from '@/lib/constants/routes'
  import {
    DEFAULT_DESCRIPTION,
    DEFAULT_TITLE,
    THEME_COLOR,
  } from '@/lib/constants/seo'
  import { Error500 } from '@/modules/errors/pages/Error500'

  import '@/lib/svelte/lenis.svelte'
  import '../app.css'

  import { windowState } from '@/lib/contexts/Window'

  let { children } = $props()

  const OG_IMAGE = `${ROUTES.home.href}/og.png`

  if (!IS_DEV) {
    injectAnalytics({ mode: 'production' })
  }
</script>

{#if windowState.pathname === ROUTES.home.pathname}
  <SvelteSeo
    title={DEFAULT_TITLE}
    description={DEFAULT_DESCRIPTION}
    canonical={ROUTES.home.href}
  />
{/if}

<SvelteSeo
  notranslate
  title={DEFAULT_TITLE}
  description={DEFAULT_DESCRIPTION}
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
