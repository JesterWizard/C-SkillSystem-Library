
import { SortDirection, SortOption, CsvParseConfig } from './types';

export const INITIAL_SORT_OPTION: SortOption = {
  field: 'name',
  direction: SortDirection.ASC,
};

// CSV is 1-indexed for rows, and A,B,C for columns
// B7-B788 -> column 1 (0-indexed), row 6 to 787 (0-indexed)
export const CSV_PARSE_CONFIG: CsvParseConfig = {
  startRow: 6, // Row 7 in CSV
  endRow: 787, // Row 788 in CSV
  columns: {
    name: 1,        // Column B
    category: 2,    // Column C
    description: 3, // Column D
    comments: 4,    // Column E
  },
};
    