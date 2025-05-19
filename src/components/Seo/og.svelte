<script lang="ts">
  import { page } from '$app/state'

  interface Props {
    title: string
    description: string
    image: string
    siteName: string
  }

  const { title, description, image, siteName }: Props = $props()
</script>

<meta property="og_site_name" content={siteName} />
<meta property="og:url" content="{page.url.hostname}{page.url.pathname}" />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
