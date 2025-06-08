
import { ThemeDefinition } from './types';

export const themes: ThemeDefinition[] = [
  {
    name: 'Light',
    styles: {
      bgBody: 'bg-slate-100',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      accentColor: 'text-blue-600',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      cardShadow: 'shadow-lg',
      inputBg: 'bg-white',
      inputBorder: 'border-slate-300 focus:border-blue-500',
      inputText: 'text-slate-900',
      buttonBg: 'bg-blue-600',
      buttonText: 'text-white',
      buttonHoverBg: 'hover:bg-blue-700',
      borderColor: 'border-slate-300',
    },
  },
  {
    name: 'Dark',
    styles: {
      bgBody: 'bg-slate-900',
      textPrimary: 'text-slate-100',
      textSecondary: 'text-slate-400',
      accentColor: 'text-sky-400',
      cardBg: 'bg-slate-800',
      cardBorder: 'border-slate-700',
      cardShadow: 'shadow-lg shadow-sky-900/50',
      inputBg: 'bg-slate-700',
      inputBorder: 'border-slate-600 focus:border-sky-500',
      inputText: 'text-slate-50',
      buttonBg: 'bg-sky-500',
      buttonText: 'text-white',
      buttonHoverBg: 'hover:bg-sky-600',
      borderColor: 'border-slate-700',
    },
  },
  {
    name: 'Forest',
    styles: {
      bgBody: 'bg-green-50',
      textPrimary: 'text-green-900',
      textSecondary: 'text-green-700',
      accentColor: 'text-emerald-600',
      cardBg: 'bg-white',
      cardBorder: 'border-green-200',
      cardShadow: 'shadow-md',
      inputBg: 'bg-white',
      inputBorder: 'border-green-300 focus:border-emerald-500',
      inputText: 'text-green-900',
      buttonBg: 'bg-emerald-500',
      buttonText: 'text-white',
      buttonHoverBg: 'hover:bg-emerald-600',
      borderColor: 'border-green-300',
    },
  },
];

export const DEFAULT_THEME_NAME = 'Dark';

export const getDefaultTheme = (): ThemeDefinition => {
  return themes.find(t => t.name === DEFAULT_THEME_NAME) || themes[0];
};
    