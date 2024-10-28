/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// const tintColorLight = '#0a7ea4';
const tintColorLight = '#606c38';
const tintColorDark = '#b7c892';

export const Colors = {
  light: {
    text: '#202f11',
    background: '#f8f2f3',
    tint: tintColorLight,
    icon: '#ae7e2d',
    primary: '#606c38',
    secondary: '#fefae0', 
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#dfedcf',
    background: '#0d0708',
    tint: tintColorDark,
    icon: '#d2a351',
    primary: '#b7c892',
    secondary: '#1e1a01', 
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
