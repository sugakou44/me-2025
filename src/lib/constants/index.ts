import { dev } from '$app/environment'
import { PUBLIC_IS_UNDER_MAINTENANCE } from '$env/static/public'

export const IS_DEV = dev
export const IS_UNDER_MAINTENANCE = PUBLIC_IS_UNDER_MAINTENANCE === 'true'
