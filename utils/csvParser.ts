
import { Skill, CsvParseConfig } from '../types';

let skillIdCounter = 0;

const generateSkillId = (): string => {
  return `skill-${skillIdCounter++}`;
};

// Basic CSV line parser, handles quoted fields
const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let currentField = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && i + 1 < line.length && line[i+1] === '"') {
                // Escaped quote
                currentField += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(currentField.trim());
            currentField = '';
        } else {
            currentField += char;
        }
    }
    result.push(currentField.trim()); // Add last field
    return result;
};


export const parseSkillsFromCSV = (csvString: string, config: CsvParseConfig): Skill[] => {
  const skills: Skill[] = [];
  skillIdCounter = 0; // Reset counter for each parse

  const lines = csvString.split(/\r?\n/); // Split by newline, handling CRLF and LF

  for (let i = config.startRow; i <= config.endRow && i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.trim() === '') continue; // Skip empty lines

    const cells = parseCsvLine(line);

    const name = cells[config.columns.name] || '';
    const category = cells[config.columns.category] || '';
    const description = cells[config.columns.description] || '';
    const comments = cells[config.columns.comments] || '';
    
    // Only add skill if a name is present (core identifier)
    if (name) {
      skills.push({
        id: generateSkillId(),
        iconName: 'PlaceholderSkillIcon', // Generic icon
        name: name,
        category: category,
        description: description,
        comments: comments,
      });
    }
  }
  return skills;
};
    