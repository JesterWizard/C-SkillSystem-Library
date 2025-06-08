
import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup'; // Import react-countup
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import SkillList from './components/SkillList';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useSkills } from './hooks/useSkills';
import { useTheme } from './contexts/ThemeContext';

interface AppConfig {
  showDataManagementButtons: boolean;
}

const App: React.FC = () => {
  const {
    filteredAndSortedSkills,
    loadSkillsFromCSV,
    loadSkillsFromJSON,
    saveSkillsToJSONFile,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    isLoading: skillsLoading,
    error,
    hasSkills,
    hasLoadedInitialSkills,
    clearError
  } = useSkills();
  const { theme } = useTheme();

  const [appConfig, setAppConfig] = useState<AppConfig>({ showDataManagementButtons: true });
  const [isConfigLoading, setIsConfigLoading] = useState<boolean>(true);
  
  // actualCount is the target for the counter
  const actualCount = filteredAndSortedSkills.length;

  useEffect(() => {
    fetch('./config.json')
      .then(response => {
        if (!response.ok) {
          console.warn('config.json not found or failed to load. Using default configuration (showDataManagementButtons: true).');
          return { showDataManagementButtons: true };
        }
        return response.json();
      })
      .then(data => {
        if (data && typeof data.showDataManagementButtons === 'boolean') {
          setAppConfig(data);
        } else {
          console.warn('Invalid config.json format (showDataManagementButtons missing or not boolean). Using default configuration.');
          setAppConfig({ showDataManagementButtons: true });
        }
      })
      .catch(fetchError => {
        console.error('Error fetching config.json:', fetchError);
        setAppConfig({ showDataManagementButtons: true });
      })
      .finally(() => {
        setIsConfigLoading(false);
      });
  }, []);

  const handleFileUpload = (file: File, type: 'csv' | 'json') => {
    clearError();
    if (type === 'csv') {
      loadSkillsFromCSV(file);
    } else {
      loadSkillsFromJSON(file);
    }
  };

  const handleCategoryFilter = (categoryName: string) => {
    setSearchTerm(categoryName);
  };
  
  const isLoading = skillsLoading || isConfigLoading; 
  // Disable search/sort if loading, or if initial load done, no skills, no error, and no active search term
  const searchSortDisabled = isLoading || (!hasSkills && hasLoadedInitialSkills && !error && searchTerm === '');


  return (
    <div className={`min-h-screen ${theme.bgBody} ${theme.textPrimary} transition-colors duration-300 ease-in-out flex flex-col`}>
      <header className={`sticky top-0 z-10 p-4 ${theme.cardBg} border-b ${theme.borderColor} ${theme.cardShadow}`}>
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
             <div className="flex items-baseline gap-x-2">
                <h1 className={`text-2xl sm:text-3xl font-bold ${theme.accentColor}`}>Skill Search</h1>
                {hasLoadedInitialSkills && (hasSkills || searchTerm) && !skillsLoading && (
                   <span className={`text-sm ${theme.textSecondary} font-medium min-w-[110px] text-left`}>
                    (<CountUp end={actualCount} duration={1} /> {actualCount === 1 ? 'skill' : 'skills'} found)
                   </span>
                )}
             </div>
            <ThemeSwitcher />
          </div>

          {!isConfigLoading && appConfig.showDataManagementButtons && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start mb-4">
              <FileUpload 
                onFileUpload={(file) => handleFileUpload(file, 'csv')} 
                isLoading={skillsLoading && !hasLoadedInitialSkills} // Only show "Processing" if it's the initial CSV load.
                label="Upload CSV"
                accept=".csv"
                idSuffix="csv"
              />
              <FileUpload 
                onFileUpload={(file) => handleFileUpload(file, 'json')} 
                isLoading={skillsLoading && !hasLoadedInitialSkills} // Only show "Processing" if it's the initial JSON load.
                label="Upload Skills JSON"
                accept=".json"
                idSuffix="json"
              />
               <button
                onClick={saveSkillsToJSONFile}
                disabled={skillsLoading || !hasSkills}
                className={`w-full md:w-auto px-4 py-2 rounded-md font-medium transition-colors duration-150 ease-in-out ${theme.buttonBg} ${theme.buttonText} ${(skillsLoading || !hasSkills) ? 'opacity-50 cursor-not-allowed' : theme.buttonHoverBg}`}
              >
                Download Skills (JSON)
              </button>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="w-full md:w-auto flex-grow">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} disabled={searchSortDisabled} />
            </div>
            <div className="flex items-center gap-3">
              <SortOptions sortOption={sortOption} onSortChange={setSortOption} disabled={searchSortDisabled} />
            </div>
          </div>
           {error && (
            <div className={`mt-3 p-3 rounded-md bg-red-100 border border-red-300 text-red-700 text-sm`} role="alert">
              <p><span className="font-semibold">Error:</span> {error}</p>
              { (error.includes("Default skills.json not found") || error.includes("Could not load default skills")) &&
                <p className="mt-1 text-xs">Consider uploading a CSV file or a previously saved 'skills.json' to populate the skills list.</p>
              }
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <SkillList 
          skills={filteredAndSortedSkills} 
          isLoading={skillsLoading} 
          error={error} 
          hasSkillsData={hasSkills}
          hasLoadedInitialSkills={hasLoadedInitialSkills}
          onCategoryClick={handleCategoryFilter}
        />
      </main>

      <footer className={`py-4 text-center border-t ${theme.borderColor} ${theme.textSecondary} text-sm`}>
        <p>&copy; ${new Date().getFullYear()} Skill Search Engine. React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
