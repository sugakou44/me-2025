<script lang="ts">
  import { cn } from '@/lib/utils/className'

  interface Props {
    class?: string
  }

  const { class: className }: Props = $props()
</script>

<figure
  class={cn('relative flex h-64 scale-70 items-center md:scale-100', className)}
>
  <div
    class="circle absolute bottom-0 left-1/2 h-16 w-16 origin-bottom rounded-full bg-white"
  >
    <div
      class="absolute top-[30%] left-[20%] h-2 w-2 scale-y-140 rounded-full bg-primary-foreground"
    ></div>
    <div
      class="absolute top-[30%] right-[20%] h-2 w-2 scale-y-140 rounded-full bg-primary-foreground"
    ></div>
    <div
      class="absolute right-[40%] bottom-[10%] rotate-90 font-mono text-primary-foreground"
    >
      )
    </div>
  </div>
</figure>

<style>
  .circle {
    will-change: transform, transform-origin, animation-timing-function;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-name: jumping;
  }
</style>
