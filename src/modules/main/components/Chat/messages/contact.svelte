<script lang="ts" module>
  import Link from '@/components/Links/Link.svelte'
  import { CONTACT } from '@/lib/constants/contact'

  export const messages = {
    sendMeAnEmail,
  }
</script>

{#snippet sendMeAnEmail()}
  Please send me an email at
  <Link isExternal href={CONTACT.email.href}>
    {CONTACT.email.label}
  </Link>
{/snippet}
