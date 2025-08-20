import { PUBLIC_HOSTNAME, PUBLIC_PROTOCOLE } from '$env/static/public'

const HOSTNAME = `${PUBLIC_PROTOCOLE || 'https://'}${PUBLIC_HOSTNAME || 'paan.dev'}`

const _ROUTES = {
  home: {
    pathname: '/',
  },
  resume: {
    pathname: '/documents/resume',
  },
  projectArchives: {
    pathname: '/archives/projects',
  },
  playground: {
    pathname: 'https://playground.paan.dev',
  },
  sandbox: {
    pathname: '/sandbox',
  },
} as const

export type RouteKey = keyof typeof _ROUTES

export const ROUTES = Object.fromEntries(
  Object.entries(_ROUTES).map(([key, value]) => {
    return [
      key,
      {
        ...value,
        href: `${HOSTNAME}/${value.pathname}`.replace(/(\/+)$/, ''),
      },
    ]
  }),
) as Record<
  RouteKey,
  {
    pathname: string
    href: string
  }
>

export const WORK_ROUTES = {
  2020: {
    pathname: 'https://2020.paan.dev',
  },
  '2020v2': {
    pathname: 'https://2020v2.paan.dev',
  },
  pdpacore: {
    pathname: 'https://pdpacore.com',
  },
  pdpaProkit: {
    pathname: 'https://pdpa.pro/prokit',
  },
  pdpaPro: {
    pathname: 'https://pdpa.pro',
  },
  cookieWow: {
    pathname: 'https://cookiewow.com',
  },
  consentWow: {
    pathname: 'https://consentwow.com',
  },
  learnpdpa: {
    pathname: 'https://learnpdpa.com',
  },
  accurately: {
    pathname: 'https://accurately.ai',
  },
  captainDispatch: {
    pathname: 'https://www.captain.ai/solutions/dispatch',
  },
  captainKitchen: {
    pathname: 'https://www.captain.ai/solutions/kitchen',
  },
  captainDriver: {
    pathname: 'https://www.captain.ai/solutions/driver',
  },
  captainTracking: {
    pathname: 'https://www.captain.ai/solutions/tracking',
  },
  captainSite: {
    pathname: 'https://www.captain.ai/about',
  },
} as const
