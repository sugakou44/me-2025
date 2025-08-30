<script lang="ts">
  import { cn } from '@/lib/utils/className'

  interface Props {
    class?: string
  }

  const { class: className }: Props = $props()
</script>

<figure
  class={cn(
    'relative mx-auto flex aspect-square h-64 scale-70 items-center md:scale-100',
    className,
  )}
>
  <div class={cn('circle absolute h-1/4 w-1/4 rounded-full')}>
    <div
      class={cn(
        'circle__before relative h-full w-full border-1 border-primary-foreground bg-white',
      )}
    >
      <div
        class="absolute top-[30%] left-[20%] h-1/8 w-1/8 scale-y-140 rounded-full bg-primary-foreground"
      ></div>
      <div
        class="absolute top-[30%] right-[20%] h-1/8 w-1/8 scale-y-140 rounded-full bg-primary-foreground"
      ></div>
      <div
        class="absolute right-[40%] bottom-[10%] rotate-90 font-mono text-primary-foreground"
      >
        )
      </div>
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

  .circle,
  .circle__before {
    will-change: transform, transform-origin, animation-timing-function;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
    animation-fill-mode: forwards;
  }

  .circle {
    animation-name: rocking;
    bottom: 0em;
    left: 50%;
    width: 3.25em;
    height: 3.25em;
    transform: translate3d(1.75em, -5em, 0);
  }
  .circle__before {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation-name: rocking-before;
    transform: rotate(10deg);
  }

  .paused > .circle,
  .paused > .circle > .circle__before {
    animation-iteration-count: 1;
  }
</style>
