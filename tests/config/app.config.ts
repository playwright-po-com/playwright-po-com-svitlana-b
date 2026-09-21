export const PROJECT_NAME = 'Навчай українською';

export const BASE_URL = 'http://localhost/';

export const ROUTES = {
  home: '',
  clubs: 'clubs',
  clubDetail: (id: number | string) => `club/${id}`,
  news: 'news',
  newsDetail: (id: number | string) => `news/${id}`,
  about: 'about',
  service: 'service',
  challenge: 'challenge',
  speakingClub: 'speakingclub',
  login: 'login',
  register: 'register',
} as const;
