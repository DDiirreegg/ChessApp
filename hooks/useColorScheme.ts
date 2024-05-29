// app/hooks/useColorScheme.ts
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme hook that returns the current color scheme
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}
