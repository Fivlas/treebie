/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// const tintColorLight = '#0a7ea4';
const tintColorLight = '#606c38';
const tintColorDark = '#fff';

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

//     --text: #202f11;
// --background: #f8f2f3;
// --primary: #606c38;
// --secondary: #fefae0;
// --accent: #ae7e2d;
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
//     --text: #dfedcf;
// --background: #0d0708;
// --primary: #b7c892;
// --secondary: #1e1a01;
// --accent: #d2a351;
  },
};
