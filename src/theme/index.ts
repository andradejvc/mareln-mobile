// Paleta central de cores
export const palette = {
  orange: '#E8590C',
  orangeDark: '#C94708',
  orangeLight: '#FFE1CF',
  pink: '#F43F5E',
  pinkLight: '#FFF0F3',
  green: '#16804A',
  greenLight: '#B9F3D1',
  white: '#FFFFFF',
  black: '#000000',
  cream: '#FFF8F1',
  sand: '#FFE7D8',
  line: '#F0E5DC',
  gray50: '#FAFAF9',
  gray100: '#F5F5F4',
  gray200: '#E7E5E4',
  gray300: '#D6D3D1',
  gray400: '#A8A29E',
  gray500: '#78716C',
  gray700: '#44403C',
  gray800: '#292524',
  gray900: '#1C1917',
};

// Tema Claro
export const lightTheme = {
  mode: 'light' as 'light' | 'dark',
  background: palette.cream,
  surface: palette.white,
  card: palette.white,
  text: palette.gray800,
  textMuted: palette.gray500,
  textLight: '#FFF4EC',
  border: palette.line,
  primary: palette.orange,
  primaryDark: palette.orangeDark,
  secondary: palette.pink,
  tint: palette.sand,
  badgeBg: palette.greenLight,
  badgeText: '#12643B',
  inputBg: '#FFFCFA',
  cardHighlight: '#FFF0E7',
  statusBar: 'dark-content' as 'dark-content' | 'light-content',
};

// Tema Escuro (Dark Mode)
export const darkTheme = {
  mode: 'dark' as 'light' | 'dark',
  background: '#171514',
  surface: '#23201E',
  card: '#272422',
  text: '#F5F5F4',
  textMuted: '#A8A29E',
  textLight: '#FFF4EC',
  border: '#3D3835',
  primary: '#FB923C',
  primaryDark: '#EA580C',
  secondary: '#FB7185',
  tint: '#3A271C',
  badgeBg: '#133D29',
  badgeText: '#6EE7B7',
  inputBg: '#211E1C',
  cardHighlight: '#2F2520',
  statusBar: 'light-content' as 'dark-content' | 'light-content',
};

// Tipografia e fontes
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    title: 28,
    display: 34,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '600' as const,
    bold: '700' as const,
    heavy: '900' as const,
  },
  lineHeight: {
    tight: 16,
    normal: 21,
    relaxed: 26,
    loose: 32,
  },
};

// Arredondamento de bordas
export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
};

// Espaçamentos padrão
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Exportação unificada para compatibilidade
export const colors = {
  orange: palette.orange,
  orangeDark: palette.orangeDark,
  pink: palette.pink,
  cream: palette.cream,
  white: palette.white,
  ink: palette.gray800,
  muted: palette.gray500,
  line: palette.line,
  paleOrange: '#FFF0E7',
  palePink: '#FFF0F3',
  green: palette.green,
};

export type AppTheme = typeof lightTheme;
