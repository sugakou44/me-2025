import { PUBLIC_IS_UNDER_MAINTENANCE } from '$env/static/public'

export const IS_DEV = import.meta.env.DEV
export const IS_UNDER_MAINTENANCE = PUBLIC_IS_UNDER_MAINTENANCE === 'true'
