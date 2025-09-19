// src/styles/theme.ts
// Bulgarian Theme Configuration for Car Marketplace

import { createGlobalStyle, DefaultTheme } from 'styled-components';

// Bulgarian Color Palette (Enhanced Yellow-Black Theme with variants)
export const bulgarianColors = {
  // Primary colors (Yellow variations)
  primary: {
    main: '#FFD700', // Bright yellow
    light: '#FFFF99', // Light yellow
    dark: '#B8860B', // Dark yellow
    contrastText: '#000000' // Black text for readability
  },
  secondary: {
    main: '#FFA500', // Orange-yellow
    light: '#FFDAB9', // Peach yellow
    dark: '#DAA520', // Golden yellow
    contrastText: '#000000'
  },
  accent: {
    main: '#FFFF00', // Pure yellow
    light: '#FFFFE0', // Very light yellow
    dark: '#F0E68C', // Khaki yellow
    contrastText: '#000000'
  },

  // Enhanced Yellow variations with color mixing
  yellow: {
    pure: '#FFFF00',        // Pure yellow
    bright: '#FFD700',      // Bright yellow
    golden: '#DAA520',      // Golden yellow
    dark: '#B8860B',        // Dark yellow
    light: '#FFFF99',       // Light yellow
    pale: '#FFFFE0',        // Pale yellow
    mustard: '#FFDB58',     // Mustard yellow
    amber: '#FFBF00',       // Amber yellow
    lemon: '#FFFACD',       // Lemon yellow
    // Reddish yellows
    orangeYellow: '#FFAE42', // Orange-yellow
    goldenRod: '#DAA520',    // Golden rod
    darkGoldenRod: '#B8860B', // Dark golden rod
    // Greenish yellows
    yellowGreen: '#ADFF2F',  // Yellow-green
    chartreuse: '#7FFF00',   // Chartreuse
    oliveDrab: '#6B8E23',    // Olive drab
    // Bluish yellows (more sophisticated tones)
    khaki: '#F0E68C',        // Khaki
    darkKhaki: '#BDB76B',    // Dark khaki
    palegoldenrod: '#EEE8AA' // Pale golden rod
  },

  // Black variations for contrast
  black: {
    pure: '#000000',    // Pure black
    soft: '#1a1a1a',    // Soft black
    dark: '#333333',    // Dark grey
    charcoal: '#404040', // Charcoal
    semiBlack: '#2c2c2c' // Semi black
  },

  // Neutral colors (yellow-black based with better contrast)
  grey: {
    50: '#FFFFF0',  // Very light yellow
    100: '#FFFFE0', // Light yellow
    200: '#FFFFCC', // Pale yellow
    300: '#FFFF99', // Light yellow
    400: '#FFFF66', // Yellow
    500: '#FFFF33', // Bright yellow
    600: '#CCCC00', // Dark yellow
    700: '#999900', // Darker yellow
    800: '#666600', // Very dark yellow
    900: '#333300'  // Almost black yellow
  },

  // Status colors (enhanced yellow-black theme)
  success: {
    main: '#9ACD32',    // Yellow-green
    light: '#ADFF2F',   // Green yellow
    dark: '#556B2F',    // Dark olive
    contrastText: '#000000'
  },
  warning: {
    main: '#FFD700',    // Gold
    light: '#FFFF00',   // Yellow
    dark: '#FFA500',    // Orange
    contrastText: '#000000'
  },
  error: {
    main: '#DC143C',    // Crimson
    light: '#FF6347',   // Tomato
    dark: '#8B0000',    // Dark red
    contrastText: '#FFFFFF'
  },
  info: {
    main: '#00CED1',    // Dark turquoise
    light: '#40E0D0',   // Turquoise
    dark: '#008B8B',    // Dark cyan
    contrastText: '#000000'
  },

  // Background colors (enhanced for better readability)
  background: {
    default: '#FFFEF0',     // Very light cream
    paper: '#FFFFF8',       // Off-white with yellow tint
    dark: '#1a1a1a',        // Dark background
    semiDark: 'rgba(0, 0, 0, 0.85)', // Semi-dark for overlays
    lightOverlay: 'rgba(255, 255, 255, 0.95)', // Light overlay
    darkOverlay: 'rgba(0, 0, 0, 0.7)' // Dark overlay
  },

  // Text colors (enhanced contrast for readability)
  text: {
    primary: '#000000',     // Pure black
    secondary: '#333333',   // Dark grey
    onDark: '#FFFFFF',      // White on dark backgrounds
    onLight: '#000000',     // Black on light backgrounds
    disabled: '#666666', // Medium grey
    hint: '#999999' // Light grey
  }
};

// Bulgarian Typography
export const bulgarianTypography = {
  fontFamily: {
    primary: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    secondary: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    accent: "'Montserrat', 'Helvetica', 'Arial', sans-serif"
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2
  }
};

// Bulgarian Spacing Scale
export const bulgarianSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem'    // 128px
};

// Bulgarian Breakpoints
export const bulgarianBreakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px'
};

// Bulgarian Shadows
export const bulgarianShadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)'
};

// Bulgarian Border Radius
export const bulgarianBorderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
};

// Bulgarian Theme
export const bulgarianTheme: DefaultTheme = {
  colors: bulgarianColors,
  typography: bulgarianTypography,
  spacing: bulgarianSpacing,
  breakpoints: bulgarianBreakpoints,
  shadows: bulgarianShadows,
  borderRadius: bulgarianBorderRadius,

  // Component specific styles
  components: {
    button: {
      borderRadius: bulgarianBorderRadius.base,
      fontWeight: bulgarianTypography.fontWeight.medium,
      transition: 'all 0.2s ease-in-out',
      backgroundColor: bulgarianColors.primary.main,
      color: bulgarianColors.primary.contrastText,
      border: `2px solid ${bulgarianColors.primary.main}`,
      '&:hover': {
        backgroundColor: bulgarianColors.primary.dark,
        borderColor: bulgarianColors.primary.dark
      }
    },
    input: {
      borderRadius: bulgarianBorderRadius.base,
      border: `2px solid ${bulgarianColors.primary.main}`,
      padding: `${bulgarianSpacing.sm} ${bulgarianSpacing.md}`,
      fontSize: bulgarianTypography.fontSize.base,
      backgroundColor: bulgarianColors.background.paper,
      color: bulgarianColors.text.primary,
      transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:focus': {
        borderColor: bulgarianColors.secondary.main,
        boxShadow: `0 0 0 3px rgba(255, 215, 0, 0.3)`
      }
    },
    card: {
      borderRadius: bulgarianBorderRadius.lg,
      boxShadow: bulgarianShadows.base,
      border: `2px solid ${bulgarianColors.primary.main}`,
      backgroundColor: bulgarianColors.background.paper,
      color: bulgarianColors.text.primary
    }
  }
};

// Global Styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: ${bulgarianTypography.lineHeight.normal};
  }

  body {
    font-family: ${bulgarianTypography.fontFamily.primary};
    color: ${bulgarianColors.text.primary};
    background-color: ${bulgarianColors.background.default};
    background-image: 
      linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 25%, rgba(255, 255, 0, 0.1) 50%, rgba(218, 165, 32, 0.1) 75%, rgba(184, 134, 11, 0.1) 100%),
      url('/media/images/backgrounds/carpic.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    animation: backgroundFade 3s ease-in-out;
  }

  @keyframes backgroundFade {
    0% {
      opacity: 0;
      filter: brightness(0.5);
    }
    50% {
      opacity: 0.7;
      filter: brightness(0.8);
    }
    100% {
      opacity: 1;
      filter: brightness(1);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${bulgarianTypography.fontFamily.accent};
    font-weight: ${bulgarianTypography.fontWeight.bold};
    line-height: ${bulgarianTypography.lineHeight.tight};
    margin-bottom: ${bulgarianSpacing.md};
    color: ${bulgarianColors.text.primary}; 
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 1px 1px 2px rgba(255, 255, 255, 0.5);
    background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
    padding: ${bulgarianSpacing.xs} ${bulgarianSpacing.sm};
    border-radius: ${bulgarianBorderRadius.sm};
    animation: textShimmer 4s ease-in-out infinite;
  }

  @keyframes textShimmer {
    0%, 100% {
      background-position: -200% center;
    }
    50% {
      background-position: 200% center;
    }
  }

  h1 { 
    font-size: ${bulgarianTypography.fontSize['4xl']}; 
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
  }
  h2 { 
    font-size: ${bulgarianTypography.fontSize['3xl']}; 
    background: linear-gradient(135deg, rgba(255, 165, 0, 0.15), rgba(255, 255, 0, 0.15));
  }
  h3 { 
    font-size: ${bulgarianTypography.fontSize['2xl']}; 
    background: linear-gradient(135deg, rgba(255, 255, 0, 0.1), rgba(218, 165, 32, 0.1));
  }
  h4 { font-size: ${bulgarianTypography.fontSize.xl}; }
  h5 { font-size: ${bulgarianTypography.fontSize.lg}; }
  h6 { font-size: ${bulgarianTypography.fontSize.base}; }

  p {
    margin-bottom: ${bulgarianSpacing.md};
    line-height: ${bulgarianTypography.lineHeight.relaxed};
    color: ${bulgarianColors.text.primary}; 
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
    padding: ${bulgarianSpacing.xs};
    border-radius: ${bulgarianBorderRadius.sm};
  }

  a {
    color: ${bulgarianColors.primary.dark};
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    font-weight: ${bulgarianTypography.fontWeight.medium};

    &:hover {
      color: ${bulgarianColors.secondary.main};
      text-decoration: underline;
    }
  }

  /* Enhanced Button styles with yellow variations */
  button {
    font-family: inherit;
    border: 2px solid transparent;
    cursor: pointer;
    font-weight: ${bulgarianTypography.fontWeight.medium};
    padding: ${bulgarianSpacing.sm} ${bulgarianSpacing.md};
    border-radius: ${bulgarianBorderRadius.md};
    transition: all 0.3s ease-in-out;
    box-shadow: ${bulgarianShadows.sm};
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.bright} 0%, 
      ${bulgarianColors.yellow.golden} 50%, 
      ${bulgarianColors.yellow.orangeYellow} 100%
    );
    color: ${bulgarianColors.text.primary};
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
    animation: buttonGlow 2s ease-in-out infinite alternate;
  }

  @keyframes buttonGlow {
    0% {
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    100% {
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.6);
    }
  }

  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }

  button:hover::before {
    left: 100%;
  }

  button:hover {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.golden} 0%, 
      ${bulgarianColors.yellow.dark} 50%, 
      ${bulgarianColors.yellow.mustard} 100%
    );
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    border-color: ${bulgarianColors.yellow.dark};
  }

  button:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
  }

  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5), ${bulgarianShadows.sm};
  }

  /* Primary button variant with reddish yellow */
  .btn-primary {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.orangeYellow} 0%, 
      ${bulgarianColors.yellow.goldenRod} 50%, 
      ${bulgarianColors.yellow.darkGoldenRod} 100%
    );
    border-color: ${bulgarianColors.yellow.darkGoldenRod};
    color: ${bulgarianColors.text.primary};
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.darkGoldenRod} 0%, 
      ${bulgarianColors.yellow.dark} 50%, 
      ${bulgarianColors.black.dark} 100%
    );
    color: ${bulgarianColors.text.onDark};
  }

  /* Secondary button variant with greenish yellow */
  .btn-secondary {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.yellowGreen} 0%, 
      ${bulgarianColors.yellow.chartreuse} 50%, 
      ${bulgarianColors.yellow.oliveDrab} 100%
    );
    border-color: ${bulgarianColors.yellow.oliveDrab};
    color: ${bulgarianColors.text.primary};
  }

  .btn-secondary:hover {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.oliveDrab} 0%, 
      ${bulgarianColors.yellow.dark} 50%, 
      ${bulgarianColors.black.charcoal} 100%
    );
    color: ${bulgarianColors.text.onDark};
  }

  /* Accent button variant with bluish yellow */
  .btn-accent {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.khaki} 0%, 
      ${bulgarianColors.yellow.darkKhaki} 50%, 
      ${bulgarianColors.yellow.palegoldenrod} 100%
    );
    border-color: ${bulgarianColors.yellow.darkKhaki};
    color: ${bulgarianColors.text.primary};
  }

  .btn-accent:hover {
    background: linear-gradient(135deg, 
      ${bulgarianColors.yellow.darkKhaki} 0%, 
      ${bulgarianColors.yellow.dark} 50%, 
      ${bulgarianColors.black.soft} 100%
    );
    color: ${bulgarianColors.text.onDark};
  }

  /* Outline button variant */
  .btn-outline {
    background: transparent;
    border: 2px solid ${bulgarianColors.yellow.bright};
    color: ${bulgarianColors.yellow.dark};
    backdrop-filter: blur(10px);

    &:hover {
      background: linear-gradient(135deg, 
        ${bulgarianColors.yellow.bright} 0%, 
        ${bulgarianColors.yellow.golden} 100%
      );
      color: ${bulgarianColors.text.primary};
    }
  }

  /* Enhanced Cards and containers with fade effects */
  .card, .container, .paper, article, section, .panel {
    background: linear-gradient(135deg, 
      rgba(255, 255, 240, 0.95) 0%, 
      rgba(255, 255, 235, 0.98) 50%, 
      rgba(255, 255, 245, 0.96) 100%
    ) !important;
    backdrop-filter: blur(15px);
    border: 2px solid ${bulgarianColors.yellow.bright};
    border-radius: ${bulgarianBorderRadius.lg};
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2), ${bulgarianShadows.lg};
    padding: ${bulgarianSpacing.lg};
    margin-bottom: ${bulgarianSpacing.lg};
    color: ${bulgarianColors.text.primary};
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
    animation: cardFadeIn 1s ease-out;
  }

  @keyframes cardFadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 215, 0, 0.1) 50%, 
      transparent 70%
    );
    animation: cardShimmer 6s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes cardShimmer {
    0%, 100% {
      transform: rotate(0deg) translate(-50%, -50%);
      opacity: 0;
    }
    50% {
      transform: rotate(180deg) translate(-50%, -50%);
      opacity: 1;
    }
  }

  .card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 35px rgba(255, 215, 0, 0.3), ${bulgarianShadows.xl};
    border-color: ${bulgarianColors.yellow.golden};
  }

  /* Enhanced input fields */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    padding: ${bulgarianSpacing.sm};
    border: 2px solid ${bulgarianColors.yellow.bright};
    border-radius: ${bulgarianBorderRadius.md};
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 240, 0.95) 100%
    );
    color: ${bulgarianColors.text.primary};
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: ${bulgarianColors.yellow.golden};
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3), 
                0 4px 15px rgba(255, 215, 0, 0.2);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 235, 1) 100%
    );
    transform: scale(1.02);
  }

  /* Enhanced navigation links */
  nav a, .nav-link {
    color: ${bulgarianColors.text.primary} !important;
    text-decoration: none;
    padding: ${bulgarianSpacing.sm} ${bulgarianSpacing.md};
    border-radius: ${bulgarianBorderRadius.md};
    transition: all 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
    font-weight: ${bulgarianTypography.fontWeight.medium};
  }

  nav a::before, .nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${bulgarianColors.yellow.bright}, 
      ${bulgarianColors.yellow.golden}
    );
    transition: width 0.3s ease-in-out;
  }

  nav a:hover::before, .nav-link:hover::before {
    width: 100%;
  }

  nav a:hover, .nav-link:hover {
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.2) 0%, 
      rgba(255, 165, 0, 0.2) 100%
    );
    transform: translateY(-2px);
    text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
  }

  /* Header and navigation with enhanced yellow theme */
  header, .header, nav, .navbar {
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.95) 0%,    /* Gold */
      rgba(255, 165, 0, 0.95) 25%,   /* Orange-yellow */
      rgba(255, 255, 0, 0.9) 50%,    /* Pure yellow */
      rgba(218, 165, 32, 0.95) 75%,  /* Golden rod */
      rgba(184, 134, 11, 0.95) 100%  /* Dark yellow */
    ) !important;
    backdrop-filter: blur(15px);
    border-bottom: 3px solid ${bulgarianColors.yellow.dark};
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
    color: ${bulgarianColors.text.primary} !important;
    padding: ${bulgarianSpacing.md} ${bulgarianSpacing.lg};
    animation: headerGlow 2s ease-in-out infinite alternate;
  }

  @keyframes headerGlow {
    0% {
      box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
    }
    100% {
      box-shadow: 0 6px 25px rgba(255, 215, 0, 0.5);
    }
  }

  /* Footer with enhanced yellow theme */
  footer, .footer {
    background: linear-gradient(45deg, 
      rgba(184, 134, 11, 0.95) 0%,   /* Dark yellow */
      rgba(218, 165, 32, 0.95) 25%,  /* Golden rod */
      rgba(255, 165, 0, 0.9) 50%,    /* Orange-yellow */
      rgba(255, 215, 0, 0.95) 75%,   /* Gold */
      rgba(255, 255, 0, 0.9) 100%    /* Pure yellow */
    ) !important;
    backdrop-filter: blur(15px);
    border-top: 3px solid ${bulgarianColors.yellow.dark};
    box-shadow: 0 -4px 20px rgba(255, 215, 0, 0.3);
    color: ${bulgarianColors.text.primary} !important;
    padding: ${bulgarianSpacing.lg};
    animation: footerPulse 3s ease-in-out infinite;
  }

  @keyframes footerPulse {
    0%, 100% {
      opacity: 0.95;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.002);
    }
  }

  /* Specific card variants */
  .card-primary {
    border-color: ${bulgarianColors.primary.main};
    background-color: rgba(255, 255, 240, 0.98) !important;
  }

  .card-secondary {
    border-color: ${bulgarianColors.secondary.main};
    background-color: rgba(255, 250, 205, 0.98) !important;
  }

  /* Modal and overlay styles */
  .modal, .overlay, .popup, .dialog {
    background-color: rgba(255, 255, 240, 0.98) !important;
    backdrop-filter: blur(15px);
    border: 3px solid ${bulgarianColors.primary.main};
    border-radius: ${bulgarianBorderRadius.xl};
    box-shadow: ${bulgarianShadows['2xl']};
    color: ${bulgarianColors.text.primary};
  }

  .modal-backdrop, .overlay-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }

  /* Header specific styles */
  header {
    background-color: rgba(255, 215, 0, 0.95) !important;
    backdrop-filter: blur(10px);
    border-bottom: 3px solid ${bulgarianColors.primary.dark};
    box-shadow: ${bulgarianShadows.md};
    position: relative;
    z-index: 1000;
  }

  header * {
    color: ${bulgarianColors.primary.contrastText} !important;
  }

  header a {
    color: ${bulgarianColors.primary.contrastText} !important;
    font-weight: ${bulgarianTypography.fontWeight.bold};

    &:hover {
      color: ${bulgarianColors.secondary.main} !important;
    }
  }

  /* Footer specific styles */
  footer {
    background-color: rgba(184, 134, 11, 0.95) !important;
    backdrop-filter: blur(10px);
    border-top: 3px solid ${bulgarianColors.primary.main};
    box-shadow: ${bulgarianShadows.md};
    color: ${bulgarianColors.primary.contrastText} !important;
    margin-top: auto;
  }

  footer *,
  footer a {
    color: ${bulgarianColors.primary.contrastText} !important;
  }

  footer a:hover {
    color: ${bulgarianColors.secondary.light} !important;
  }

  /* Navigation styles */
  nav, .navbar, .menu {
    background-color: rgba(255, 255, 0, 0.95) !important;
    backdrop-filter: blur(10px);
    border-bottom: 2px solid ${bulgarianColors.primary.dark};
  }

  nav a, .navbar a, .menu a {
    color: ${bulgarianColors.primary.contrastText} !important;
    font-weight: ${bulgarianTypography.fontWeight.medium};

    &:hover {
      color: ${bulgarianColors.secondary.main} !important;
      background-color: rgba(255, 215, 0, 0.2);
    }
  }

  /* Dropdown menus */
  .dropdown, .dropdown-menu {
    background-color: rgba(255, 255, 240, 0.98) !important;
    backdrop-filter: blur(10px);
    border: 2px solid ${bulgarianColors.primary.main};
    box-shadow: ${bulgarianShadows.lg};
  }

  .dropdown a, .dropdown-menu a {
    color: ${bulgarianColors.text.primary} !important;

    &:hover {
      background-color: ${bulgarianColors.primary.light};
      color: ${bulgarianColors.primary.contrastText} !important;
    }
  }

  /* Form elements with yellow theme */
  input, textarea, select {
    background-color: rgba(255, 255, 240, 0.9) !important;
    border: 2px solid ${bulgarianColors.primary.main};
    color: ${bulgarianColors.text.primary};
    font-size: ${bulgarianTypography.fontSize.base};
    padding: ${bulgarianSpacing.sm} ${bulgarianSpacing.md};
    border-radius: ${bulgarianBorderRadius.base};
    transition: all 0.2s ease-in-out;

    &:focus {
      border-color: ${bulgarianColors.secondary.main};
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
      outline: none;
    }

    &::placeholder {
      color: ${bulgarianColors.text.hint};
    }
  }

  /* Labels */
  label {
    color: ${bulgarianColors.text.primary};
    font-weight: ${bulgarianTypography.fontWeight.medium};
    margin-bottom: ${bulgarianSpacing.xs};
    display: block;
  }

  /* Checkboxes and radio buttons */
  input[type="checkbox"], input[type="radio"] {
    accent-color: ${bulgarianColors.primary.main};
  }

  /* Links with better contrast */
  a {
    color: ${bulgarianColors.primary.dark};
    text-decoration: none;
    font-weight: ${bulgarianTypography.fontWeight.medium};
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
      color: ${bulgarianColors.secondary.main};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${bulgarianColors.primary.main};
      outline-offset: 2px;
    }
  }

  /* Alert and notification styles */
  .alert, .notification, .message {
    border-radius: ${bulgarianBorderRadius.base};
    padding: ${bulgarianSpacing.md};
    margin-bottom: ${bulgarianSpacing.md};
    font-weight: ${bulgarianTypography.fontWeight.medium};
  }

  .alert-success {
    background-color: rgba(154, 205, 50, 0.9);
    border: 2px solid ${bulgarianColors.success.main};
    color: ${bulgarianColors.success.contrastText};
  }

  .alert-warning {
    background-color: rgba(255, 215, 0, 0.9);
    border: 2px solid ${bulgarianColors.warning.main};
    color: ${bulgarianColors.warning.contrastText};
  }

  .alert-error {
    background-color: rgba(220, 20, 60, 0.9);
    border: 2px solid ${bulgarianColors.error.main};
    color: ${bulgarianColors.error.contrastText};
  }

  .alert-info {
    background-color: rgba(0, 206, 209, 0.9);
    border: 2px solid ${bulgarianColors.info.main};
    color: ${bulgarianColors.info.contrastText};
  }

  /* Loading and progress indicators */
  .loading-spinner {
    border: 3px solid ${bulgarianColors.grey[300]};
    border-top: 3px solid ${bulgarianColors.primary.main};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Badge and tag styles */
  .badge, .tag {
    background-color: ${bulgarianColors.primary.main};
    color: ${bulgarianColors.primary.contrastText};
    padding: ${bulgarianSpacing.xs} ${bulgarianSpacing.sm};
    border-radius: ${bulgarianBorderRadius.sm};
    font-size: ${bulgarianTypography.fontSize.sm};
    font-weight: ${bulgarianTypography.fontWeight.medium};
  }

  .badge-secondary {
    background-color: ${bulgarianColors.secondary.main};
    color: ${bulgarianColors.secondary.contrastText};
  }

  /* Responsive utilities */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${bulgarianSpacing.md};
  }

  @media (min-width: ${bulgarianBreakpoints.sm}) {
    .container {
      padding: 0 ${bulgarianSpacing.lg};
    }
  }

  @media (min-width: ${bulgarianBreakpoints.md}) {
    .container {
      padding: 0 ${bulgarianSpacing.xl};
    }
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus styles with yellow theme */
  *:focus {
    outline: 2px solid ${bulgarianColors.primary.main};
    outline-offset: 2px;
  }

  button:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${bulgarianColors.secondary.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
  }

  /* Print styles */
  @media print {
    body {
      background-color: white !important;
      background-image: none !important;
      color: black !important;
    }

    .card, .container, .paper {
      background-color: white !important;
      box-shadow: none !important;
    }

    a {
      color: black !important;
      text-decoration: underline !important;
    }
  }
`;

// Type augmentation for styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof bulgarianColors;
    typography: typeof bulgarianTypography;
    spacing: typeof bulgarianSpacing;
    breakpoints: typeof bulgarianBreakpoints;
    shadows: typeof bulgarianShadows;
    borderRadius: typeof bulgarianBorderRadius;
    components: {
      button: any;
      input: any;
      card: any;
    };
  }
}