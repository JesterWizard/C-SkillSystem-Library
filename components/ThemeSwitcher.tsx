
import React, { ChangeEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { themeName, changeTheme, availableThemes, theme } = useTheme();

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changeTheme(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className={`text-sm font-medium ${theme.textSecondary}`}>Theme:</label>
      <select
        id="theme-select"
        value={themeName}
        onChange={handleThemeChange}
        className={`px-3 py-2 rounded-md ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} focus:ring-2 focus:ring-opacity-50`}
      >
        {availableThemes.map(t => (
          <option key={t.name} value={t.name}>{t.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;
    