
import React, { ChangeEvent } from 'react';
import { Skill, SortOption, SortDirection } from '../types'; // Added Skill import
import { useTheme } from '../contexts/ThemeContext.tsx';

interface SortOptionsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  disabled?: boolean;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, onSortChange, disabled }) => {
  const { theme } = useTheme();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = event.target.value.split('-') as [keyof Pick<Skill, 'name'>, SortDirection];
    onSortChange({ field, direction });
  };

  return (
    <select
      value={`${sortOption.field}-${sortOption.direction}`}
      onChange={handleChange}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} focus:ring-2 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
    </select>
  );
};

export default SortOptions;
