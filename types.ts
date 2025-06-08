
export interface Skill {
  id: string;
  iconName: string; // Placeholder, could be key for specific icon component
  name: string;
  category: string;
  description: string;
  comments: string;
}

export interface ThemeStyleProps {
  bgBody: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  buttonBg: string;
  buttonText: string;
  buttonHoverBg: string;
  borderColor: string;
  // Add more as needed
}

export interface ThemeDefinition {
  name: string;
  styles: ThemeStyleProps;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortOption {
  field: keyof Pick<Skill, 'name'>; // Currently only sorting by name
  direction: SortDirection;
}

// For CSV parsing configuration
export interface CsvColumnConfig {
  name: number;
  category: number;
  description: number;
  comments: number;
}

export interface CsvParseConfig {
  startRow: number; // 0-indexed
  endRow: number; // 0-indexed, inclusive
  columns: CsvColumnConfig;
}
    