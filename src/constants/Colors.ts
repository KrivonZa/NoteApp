/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0db1fc';
const tintColorDark = '#47c5ff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    iconAdd: '#44c4ff',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    placeholder: 'rgba(0, 0, 0, 0.5)',
    border: '#ccc',
    shadow: 'rgba(0, 0, 0, 0.5)',
    backgroundIcon: '#fff',
    icon: '#0db1fc',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    iconAdd: '#81d4fa',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    placeholder: 'rgba(255, 255, 255, 0.5)',
    border: '#444',
    shadow: 'rgba(255, 255, 255, 0.5)',
    backgroundIcon: '#0a7ea4',
    icon: '#47c5ff',
  },
};
