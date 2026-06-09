export const theme = {
  colors: {
    background: '#F3F1F0',
    primary: '#8A645D',
    primaryHover: '#76514B',
    surface: '#ECE9E8',
    border: '#D4C6C2',
    text: '#8A645D',
    textMuted: 'rgba(138, 100, 93, 0.8)',
    white: '#FFFFFF',
  },
  fonts: {
    serif: 'font-serif-brand',
    sans: 'font-sans-brand',
  },
  radius: {
    organic: 'organic-radius',
    organicReverse: 'organic-radius-reverse',
  },
  contact: {
    email: 'psi.luanasakovicz@gmail.com',
    phone: '(41) 99136-9954',
    crp: 'CRP 08/48498',
    social: {
      instagram: 'https://www.instagram.com/psi.luanasakovicz',
      linkedin: 'https://www.linkedin.com/in/luana-sakovicz-353b7111b',
      whatsapp: 'https://wa.me/5541991369954',
    },
  },
} as const;

export type Theme = typeof theme;
