<script lang="ts">
  import { DEFAULT_SITENAME } from '@/lib/constants/seo'

  import './fonts.css'

  import { asset } from '$app/paths'
</script>

<svelte:head>
  <meta charset="utf-8" />
  <!-- preload font -->
  <link
    rel="preload"
    href={asset('/fonts/Sono/Sono-VariableFont_MONO,wght.ttf')}
    as="font"
    type="font/ttf"
    crossorigin=""
  />
  <link
    rel="preload"
    href={asset('/fonts/Caveat_Brush/CaveatBrush-Regular.ttf')}
    as="font"
    type="font/ttf"
    crossorigin=""
  />

  <!-- icons -->
  <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
  <link
    rel="icon"
    type="image/png"
    href={asset('/icons/favicon_96x96.png')}
    sizes="96x96"
  />
  <link rel="shortcut icon" href={asset('/favicon.ico')} />
  <meta name="apple-mobile-web-app-title" content={DEFAULT_SITENAME} />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />

  <!-- apple touch icon -->
  <link
    rel="apple-touch-icon"
    sizes="512x512"
    href={asset('/icons/favicon_512x512.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="60x60"
    href={asset('/icons/favicon_60x60.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="76x76"
    href={asset('/icons/favicon_76x76.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="120x120"
    href={asset('/icons/favicon_120x120.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="152x152"
    href={asset('/icons/favicon_152x152.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="167x167"
    href={asset('/icons/favicon_167x167.png')}
    type="image/png"
  />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href={asset('/icons/favicon_180x180.png')}
    type="image/png"
  />
</svelte:head>
