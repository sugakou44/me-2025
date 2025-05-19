<script lang="ts">
  import { innerHeight, innerWidth } from 'svelte/reactivity/window'

  import { DialogBox } from '@/components/DialogBox'
  import { getBreakPointValue } from '@/lib/svelte/breakpointValues.svelte'

  import { BongoCat } from '../../components/BongoCat'
  import { ErrorText } from '../../components/ErrorText'
  import { PageContainer } from '../../components/PageContainer'

  const yMultiplier = getBreakPointValue({
    base: 0.35,
    md: 0.25,
  })

  const dialogPosition = $derived([
    (innerWidth.current ?? 0) * 0.25,
    (innerHeight.current ?? 0) * yMultiplier()!,
  ]) as Point2d
</script>

<PageContainer>
  {#if innerWidth.current}
    <DialogBox
      position={dialogPosition}
      label="You broke it, didn&apos;t you"
      class="lg:scale-150"
    />
  {/if}
  <ErrorText class="-translate-y-[55%] scale-150" />
  <BongoCat />
  <div
    class="absolute inset-0 z-30 origin-top translate-y-[50%] scale-200 rotate-[14deg] bg-primary-foreground"
  ></div>
</PageContainer>
