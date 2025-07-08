import { useColorScheme } from 'react-native';
import { DayColors, NightColors } from './colors';

export const useThemeColors = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? NightColors : DayColors;
};
