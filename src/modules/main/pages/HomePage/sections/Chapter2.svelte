<script lang="ts">
  import { Paragraph } from '@/modules/main/components/Text'
  import { appState } from '@/modules/main/contexts/AppState'
</script>

<section bind:this={appState.chapter2Container}>
  <div class="section chapter">
    <Paragraph>
      After I graduated, I started working as an engineer in a factory. At
      first, it felt like the natural next step — numbers, circuits, processes —
      all the stuff I had spent years learning.
      <br />
      But very quickly, I realized that the day-to-day reality was…
      <br />
      <br />
      a little different from what I had imagined.
    </Paragraph>
  </div>
  <div class="section chapter">
    <Paragraph>
      Most of my time there was quite boring. there is little to no support from
      between team and I can only ask for question and request stuff from my
      team, which was quite limited.
    </Paragraph>
  </div>
  <div class="section chapter">
    <Paragraph>
      But somewhere in the middle of all that, I got an opportunity to create a
      small internal tools for the team and debugger for refrigerator.
      <br />
      I built tools people actually used, and for the first time, code felt meaningful.
    </Paragraph>
  </div>
</section>
