<script lang="ts">
  import { Button } from '@/components/Buttons'
  import { ROUTES } from '@/lib/constants/routes'
  import { Footprints } from '@/modules/errors/components/Footprints'

  import { CursorTheif } from '../../components/CursorTheif'
  import { PageContainer } from '../../components/PageContainer'
  import Charactor4 from './Charactor4.svelte'
</script>

<PageContainer>
  <Footprints />
  <figure class="relative flex items-center gap-8 md:gap-[100px]">
    <Charactor4 />
    <CursorTheif />
    <Charactor4 />
  </figure>
  <Button size="lg" href={ROUTES.home.pathname}>Back to home</Button>
</PageContainer>
