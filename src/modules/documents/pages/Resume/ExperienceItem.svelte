<script lang="ts">
  import type { ExperienceItem } from '@/lib/constants/content'

  let { id, company, year, role }: ExperienceItem = $props()
</script>

<div class="flex flex-col gap-2">
  <h3 class="font-medium">{company}</h3>
  <div class="space-y-1">
    <p class="flex justify-between gap-2 text-sm">
      <span>{role}</span>
      <span class="year text-md font-extralight text-zinc-900 underline">
        {year}
      </span>
    </p>
    <div class="md:text- text-sm font-extralight">
      {#if id === 'ascend'}
        <ul>
          <li>
            Built and maintained a React Native mobile application used by
            in-store staff to pick orders and hand them over to riders/drivers
            for deliveries.
          </li>
          <li>
            Collaborated closely with backend, product, and operations teams to
            align the app with real in-store processes.
          </li>
        </ul>
      {:else if id === 'captain'}
        <ul>
          <li>
            Built and maintained multiple React/Next.js/React Native
            applications.
          </li>
          <li>
            Developed graphical interface builder for delivery tracking
            application.
          </li>
          <li>
            Improved user interface/experience across multiple applications.
          </li>
          <li>Integrated CMS solution (Directus) via graphQL.</li>
          <li>
            Integrated various third-party solutions (eg. Firebase, GraphHopper,
            MapBox, etc.)
          </li>
          <li>Revamped legacy projects into modern and typed React apps.</li>
        </ul>
      {:else if id === 'datawow'}
        <ul>
          <li>Worked on product across PDPA suites.</li>
          <li>
            Used CSS-in-JS (emotionjs, Chakra-ui) and Storybook for design
            systems.
          </li>
          <li>Implemented audio vitualizer using Audio/MediaRecorder API.</li>
          <li>Integrated LMS solutions.</li>
          <li>
            Create prototype/mockup project to assist product and sales team
          </li>
          <li>Managed Github action/CircleCI/Kubernetes</li>
        </ul>
      {:else if id === 'magicbox'}
        <ul>
          <li>Built meeting room management system.</li>
          <li>Implements room detection from floor plan using openCV.</li>
          <li>Integrated gitlab-runner for CI/CD pipeline.</li>
        </ul>
      {:else if id === 'other'}
        <ul>
          <li>
            Created 360°/3D spatial experiences for exhibitions using Threejs.
          </li>
          <li>
            Implemented RESTful APIs for content/questionaire management with
            Nestjs and PostgreSQL.
          </li>
          <li>Made a ebook site with realistic page turning effect.</li>
        </ul>
      {/if}
    </div>
  </div>
</div>
