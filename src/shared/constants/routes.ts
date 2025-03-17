export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  LINK_EXPIRED: '/link-expired',
  CONFIRM_EMAIL: '/confirm-email',
  RESET_PASSWORD: '/reset-password',
  // todo: Если маршрут динамический можно сделать функцию. Например:
  // getUserProfile: (userId: string) => `/profile/${userId}`
} as const
