
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Skill, SortOption, CsvParseConfig } from '../types';
import { parseSkillsFromCSV } from '../utils/csvParser';
import { INITIAL_SORT_OPTION, CSV_PARSE_CONFIG } from '../constants';

// Helper to trigger browser download
const downloadJSON = (data: any, filename: string) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = filename;
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};


export const useSkills = () => {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>(INITIAL_SORT_OPTION);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedInitialSkills, setHasLoadedInitialSkills] = useState<boolean>(false);

  useEffect(() => {
    // Try to load skills from a public skills.json on initial mount
    setIsLoading(true);
    setError(null);
    fetch('/skills.json') // Assumes skills.json is in the public root or served at this path
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            console.log('Default skills.json not found. Starting with empty skill set.');
            setAllSkills([]); // Start with no skills if file not found
            return null; 
          }
          throw new Error(`Failed to fetch skills.json: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: Skill[] | null) => {
        if (data && Array.isArray(data)) {
          // Validate structure if necessary, for now assume it's correct Skill[]
          const validSkills = data.filter(skill => skill && typeof skill.id === 'string' && typeof skill.name === 'string');
          setAllSkills(validSkills);
        } else if (data !== null) { 
          console.warn('Invalid data format in skills.json. Expected an array of skills.');
          setAllSkills([]);
          setError('Failed to load default skills: Invalid format in skills.json.');
        }
      })
      .catch(e => {
        console.error('Error loading default skills.json:', e);
        // Don't set an error here if it's just a 404, as that's handled. 
        // Set error for actual fetch/parse failures.
        if (e.message.includes('Failed to fetch skills.json')) {
           setError(`Could not load default skills: ${e.message}. You can upload a CSV or a skills.json file.`);
        } else if (!`${e}`.toLowerCase().includes('404')) {
           setError(`Error processing default skills.json: ${e.message}.`);
        }
        setAllSkills([]); 
      })
      .finally(() => {
        setIsLoading(false);
        setHasLoadedInitialSkills(true);
      });
  }, []);

  const loadSkillsFromCSV = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          const parsedSkills = parseSkillsFromCSV(text, CSV_PARSE_CONFIG);
          setAllSkills(parsedSkills);
          if (parsedSkills.length === 0) {
            setError("No skills found in the CSV or data is outside the expected range (Rows 7-788, Columns B-E). Please check the CSV format.");
          } else {
            // Optionally, prompt user to save or inform them data is ready to be saved.
            // For now, data is just in memory until "Download Skills (JSON)" is clicked.
          }
        } else {
          setError('Failed to read file content.');
        }
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError('Error reading file.');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError(`Error processing CSV: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, []);

  const loadSkillsFromJSON = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          try {
            const parsedSkills: Skill[] = JSON.parse(text);
            if (Array.isArray(parsedSkills) && parsedSkills.every(skill => skill && typeof skill.id === 'string' && typeof skill.name === 'string')) {
              setAllSkills(parsedSkills);
              if (parsedSkills.length === 0) {
                setError("The uploaded JSON file contains no skills.");
              }
            } else {
              setError('Invalid JSON format. Expected an array of skill objects.');
              setAllSkills([]); // Clear existing skills if new JSON is invalid
            }
          } catch (parseError) {
            setError(`Error parsing JSON file: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
            setAllSkills([]);
          }
        } else {
          setError('Failed to read JSON file content.');
        }
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError('Error reading JSON file.');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError(`Error processing JSON file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, []);

  const saveSkillsToJSONFile = useCallback(() => {
    if (allSkills.length === 0) {
      setError("No skills to save. Upload a CSV or JSON file first.");
      return;
    }
    setError(null); // Clear any previous errors
    downloadJSON(allSkills, 'skills.json');
  }, [allSkills]);


  const filteredAndSortedSkills = useMemo(() => {
    let skillsToDisplay = [...allSkills];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      skillsToDisplay = skillsToDisplay.filter(skill =>
        skill.name.toLowerCase().includes(lowerSearchTerm) ||
        (skill.category && skill.category.toLowerCase().includes(lowerSearchTerm)) ||
        (skill.description && skill.description.toLowerCase().includes(lowerSearchTerm)) ||
        (skill.comments && skill.comments.toLowerCase().includes(lowerSearchTerm))
      );
    }

    skillsToDisplay.sort((a, b) => {
      const valA = a[sortOption.field];
      const valB = b[sortOption.field];
      
      if (valA < valB) return sortOption.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortOption.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return skillsToDisplay;
  }, [allSkills, searchTerm, sortOption]);
  
  const hasSkills = useMemo(() => allSkills.length > 0, [allSkills]);

  return {
    allSkills, // Mainly for the save function
    filteredAndSortedSkills,
    loadSkillsFromCSV,
    loadSkillsFromJSON,
    saveSkillsToJSONFile,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    isLoading,
    error,
    hasSkills,
    hasLoadedInitialSkills,
    clearError: () => setError(null),
  };
};
