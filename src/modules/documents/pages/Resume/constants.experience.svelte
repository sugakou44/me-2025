<script lang="ts" module>
  interface Experience {
    key: 'captain' | 'datawow' | 'magicbox' | 'freelance'
    company: string
    year: string
    role: string
    total?: string
  }

  export const EXPERIENCE: Experience[] = [
    {
      key: 'captain',
      company: 'Captain AI Technologies., Ltd.',
      year: '2022 - 2025',
      role: 'Front-end developer',
    },
    {
      key: 'datawow',
      company: 'Data Wow Co., Ltd.',
      year: '2021 - 2022',
      role: 'Front-end developer',
    },
    {
      key: 'magicbox',
      company: 'Magic Box Solutions Co., Ltd.',
      year: '2019 - 2020',
      role: 'Back-end Developer',
    },
    {
      key: 'freelance',
      company: 'Freelancing',
      year: '2020 - Present',
      role: 'Developer',
    },
  ]

  export const experienceDescription = Description
</script>

{#snippet Description(key: Experience['key'])}
  {#if key === 'captain'}
    <ul>
      <li>
        Built and maintained multiple React/Next.js/React Native applications.
      </li>
      <li>
        Developed graphical interface builder for delivery tracking application.
      </li>
      <li>Improved user interface/experience across multiple applications.</li>
      <li>Integrated CMS solution (Directus) via graphQL.</li>
      <li>
        Integrated various third-party solutions (eg. Firebase, GraphHopper,
        MapBox, etc.)
      </li>
      <li>Revamped legacy projects into modern React apps.</li>
    </ul>
  {:else if key === 'datawow'}
    <ul>
      <li>Worked on product across PDPA suites.</li>
      <li>
        Used CSS-in-JS (emotionjs, Chakra-ui) and Storybook for design systems.
      </li>
      <li>Implemented audio vitualizer using Audio/MediaRecorder API.</li>
      <li>Integrated LMS solutions.</li>
      <li>Create prototype/mockup project to assist product and sales team</li>
      <li>Managed Github action/CircleCI/Kubernetes</li>
    </ul>
  {:else if key === 'magicbox'}
    <ul>
      <li>Built meeting room management system.</li>
      <li>Implements room detection from floor plan using openCV.</li>
      <li>Integrated gitlab-runner for CI/CD pipeline.</li>
    </ul>
  {:else if key === 'freelance'}
    <ul>
      <li>
        Created 360°/3D spatial experiences for exhibitions using Threejs.
      </li>
      <li>
        Implemented RESTful APIs for content/questionaire management with Nestjs
        and PostgreSQL.
      </li>
      <li>Made a ebook site with realistic page turning effect.</li>
    </ul>
  {/if}
{/snippet}
