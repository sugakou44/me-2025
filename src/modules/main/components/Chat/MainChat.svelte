<script lang="ts">
  import { Chat } from '@/components/Chat'

  import { MESSAGES } from './constants'
</script>

<div class="margin-auto section flex justify-center">
  <Chat messages={MESSAGES} />
</div>
