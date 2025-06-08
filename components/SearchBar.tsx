
import React, { ChangeEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, disabled }) => {
  const { theme } = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search skills..."
      value={searchTerm}
      onChange={handleChange}
      disabled={disabled}
      className={`w-full max-w-md px-4 py-2 rounded-md ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} focus:ring-2 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  );
};

export default SearchBar;
    