<script lang="ts">
  import { cn } from '@/lib/utils/className'
</script>

<div class="relative -z-0 h-fit w-fit text-[200px] md:text-[400px]">
  <div
    class={cn(
      'halftone-clip-text halftone absolute inset-0 translate-x-20 translate-y-[30%] -translate-z-10 scale-90 rotate-x-60 -skew-x-30 rounded-full text-primary [--size:0.06em] [--stop1:0.01em] [--stop2:0.01em] perspective-dramatic',
      '[&::after]:font-mono [&::after]:text-[200px] [&::after]:font-bold [&::after]:[content:"4"] md:[&::after]:text-[400px]',
    )}
  ></div>
  <p
    class="relative z-20 font-mono text-[200px] font-semibold text-primary-foreground md:text-[400px]"
  >
    4
  </p>
</div>
