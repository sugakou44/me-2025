<script lang="ts" module>
  export {
    pdpacoreDescription,
    pdpaprokitDescription,
    pdpaproDescription,
    cookiewowDescription,
    captainSiteDescription,
    captainDispatchDescription,
    captainDriverDescription,
    captainKitchenDescription,
    captainTrackingDescription,
    worldRabiesDescription,
    oldSiteDescription,
  }
</script>

<script lang="ts">
  import HighlightText from '@/modules/main/components/Text/HighlightText.svelte'
</script>

{#snippet pdpacoreDescription(_isIn?: boolean)}
  A complete landing page for PDPACore, integrated with Slack API for form
  submissions and connected to a in-house blog service for content publishing.
{/snippet}

{#snippet pdpaprokitDescription(isIn?: boolean)}
  Landing page &amp; platform for download PDPA documents and handbooks.
  connected with <HighlightText visible={isIn}>Stripe</HighlightText> as well as
  in-house API.
{/snippet}

{#snippet pdpaproDescription()}
  Platform for quickly create and maintain PDPA-compliant Privacy Policies
{/snippet}

{#snippet cookiewowDescription(isIn?: boolean)}
  An all-in-one cookie banner solution, offering
  <HighlightText visible={isIn}>customization options</HighlightText>,
  <HighlightText visible={isIn}>seamless WordPress integration</HighlightText> through
  a plugin.
{/snippet}

{#snippet captainSiteDescription(_isIn?: boolean)}
  Just a company website.
{/snippet}

{#snippet captainDriverDescription(_isIn?: boolean)}
  React native app for drivers.
{/snippet}

{#snippet captainDispatchDescription(_isIn?: boolean)}
  An application built to provide complete delivery details, offering real-time
  tracking, status updates, and insights to make managing deliveries simpler and
  more transparent.
{/snippet}

{#snippet captainTrackingDescription(isIn?: boolean)}
  A web application for delivery tracking,
  <HighlightText visible={isIn}>
    fully customizable to match your branding
  </HighlightText>.
{/snippet}

{#snippet captainKitchenDescription(isIn?: boolean)}
  An application designed for kitchen staff, providing
  <HighlightText visible={isIn}>
    real-time order tracking and smart prioritization
  </HighlightText>
  to decide which dishes should be cooked first. Built with React Native, it also
  runs seamlessly on the web via
  <HighlightText visible={isIn}>React Native Web</HighlightText>.
{/snippet}

{#snippet worldRabiesDescription(isIn?: boolean)}
  An online exhibition developed for Thailand World Rabies Day 2020, bringing
  educational content, resources, and activities into an accessible
  <HighlightText visible={isIn}>virtual space</HighlightText>
  .
{/snippet}

{#snippet oldSiteDescription(_isIn?: boolean)}
  An old portfolio site
{/snippet}
