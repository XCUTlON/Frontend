import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Seguridad',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/seguridad/login',
      },
      {
        title: 'Logout',
        link: '/pages/seguridad/logout',
      },
    ],
  },
  {
    title: 'Votación',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Candidato',
        link: '/pages/candidato/listar',
      },
      {
        title: 'Partido',
        link: '/pages/partido/listar',
      },
      {
        title: 'Mesa',
        link: '/pages/mesa/listar',
      },
      {
        title: 'Resultado',
        link: '/pages/resultado/listar',
      },
    ],
  },
];
