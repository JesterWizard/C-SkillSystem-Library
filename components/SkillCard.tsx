import React, { useState } from 'react';
import { Skill } from '../types';
import SkillIcon from './icons/SkillIcon.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface SkillCardProps {
  skill: Skill;
  onCategoryClick?: (category: string) => void;
}

const ExpandIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CollapseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);


const SkillCard: React.FC<SkillCardProps> = ({ skill, onCategoryClick }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card expand/collapse
    if (skill.category && onCategoryClick) {
      onCategoryClick(skill.category);
    }
  };

  return (
    <div 
      className={`p-4 rounded-lg border ${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.textPrimary} transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl flex flex-col justify-between`}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsExpanded(!isExpanded); }}
      aria-expanded={isExpanded}
      aria-controls={`skill-details-${skill.id}`}
    >
      <div> {/* Wrapper for top content (icon, name, button) */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-grow min-w-0"> {/* Container for icon and text block */}
            <SkillIcon className={`mt-1 flex-shrink-0 ${theme.accentColor}`} />
            <div className="flex-grow min-w-0"> {/* Text block for name, category, description snippet */}
              <h3 className={`text-lg font-semibold ${theme.accentColor} truncate`}>{skill.name}</h3>
              {!isExpanded && (
                <div className="mt-1 space-y-1">
                  {skill.category && (
                    <button
                      type="button"
                      onClick={handleCategoryClick}
                      className={`text-xs ${theme.textSecondary} hover:${theme.accentColor} hover:underline focus:outline-none focus:underline focus:${theme.accentColor} text-left truncate w-full`}
                      aria-label={`Filter by category: ${skill.category}`}
                    >
                       {skill.category}
                    </button>
                  )}
                  {skill.description && (
                    <p className={`text-xs ${theme.textSecondary} line-clamp-2 leading-snug h-8`}>
                      {skill.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <button 
            aria-label={isExpanded ? "Collapse skill details" : "Expand skill details"}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 ${theme.textSecondary} hover:${theme.accentColor} flex-shrink-0`}
          >
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div id={`skill-details-${skill.id}`} className="mt-4 space-y-3 pl-1 md:pl-7">
          {skill.category && (
             <div>
                <h4 className={`text-xs font-semibold uppercase ${theme.textSecondary} mb-1`}>Category</h4>
                <button
                  type="button"
                  onClick={handleCategoryClick}
                  className={`text-sm font-medium ${theme.textPrimary} hover:${theme.accentColor} hover:underline focus:outline-none focus:underline focus:${theme.accentColor} text-left`}
                  aria-label={`Filter by category: ${skill.category}`}
                >
                  {skill.category}
                </button>
             </div>
          )}
          {skill.description && (
            <div>
              <h4 className={`text-xs font-semibold uppercase ${theme.textSecondary} mb-1`}>Description</h4>
              <p className={`text-sm leading-relaxed break-words ${theme.textPrimary}`}>{skill.description}</p>
            </div>
          )}
          {skill.comments && (
            <div>
              <h4 className={`text-xs font-semibold uppercase ${theme.textSecondary} mb-1`}>Comments/Notes</h4>
              <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${theme.textPrimary}`}>{skill.comments}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillCard;
