import React from 'react';
import { Skill } from '../types';
import SkillCard from './SkillCard.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface SkillListProps {
  skills: Skill[];
  isLoading: boolean;
  error: string | null; 
  hasSkillsData: boolean; 
  hasLoadedInitialSkills: boolean;
  onCategoryClick?: (category: string) => void;
}

const SkillList: React.FC<SkillListProps> = ({ skills, isLoading, error, hasSkillsData, hasLoadedInitialSkills, onCategoryClick }) => {
  const { theme } = useTheme();

  if (isLoading && !hasLoadedInitialSkills) { 
    return <p className={`text-center py-10 ${theme.textPrimary}`}>Loading default skills...</p>;
  }
  
  if (isLoading && hasLoadedInitialSkills) { 
     return <p className={`text-center py-10 ${theme.textPrimary}`}>Processing uploaded file...</p>;
  }

  if (!hasSkillsData && hasLoadedInitialSkills && !isLoading && !error) { 
     return (
      <div className={`text-center py-10 px-4 ${theme.textSecondary}`}>
        <p>No skills data loaded.</p>
        <p className="mt-1 text-sm">You can upload a CSV file with skill information, or a previously saved 'skills.json' file.</p>
      </div>
    );
  }

  if (skills.length === 0 && hasSkillsData && !isLoading) { 
    return <p className={`text-center py-10 ${theme.textSecondary}`}>No skills match your search criteria.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
      {skills.map(skill => (
        <SkillCard key={skill.id} skill={skill} onCategoryClick={onCategoryClick} />
      ))}
    </div>
  );
};

export default SkillList;
