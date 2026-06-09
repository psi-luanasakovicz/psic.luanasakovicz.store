export const theme = {
  colors: {
    /** Verde-água da logo (nome, símbolo psi) */
    primary: '#88B7A5',
    primaryHover: '#72A190',
    /** Rosa da logo (subtítulo, detalhes) */
    accent: '#E8A8B8',
    accentHover: '#D892A5',
    /** Texto legível derivado do verde da marca */
    text: '#527A6B',
    textMuted: 'rgba(82, 122, 107, 0.8)',
    background: '#F8FAF9',
    surface: '#EEF5F2',
    surfacePink: '#FBF0F3',
    border: '#C8DDD4',
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
