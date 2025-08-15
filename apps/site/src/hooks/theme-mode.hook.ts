import { create } from 'zustand';

type Mode = 'light' | 'dark' | 'system';
type ThemeState = {
  setMode: (theme: Mode) => void;
  mode: Mode;
};

export const useThemeMode = create<ThemeState>()(set => ({
  setMode: theme => set(() => ({ mode: theme })),
  mode: 'system',
}));
