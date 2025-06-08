
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SkillIconProps {
  iconUrl?: string;
  altText?: string;
  className?: string;
}

// Default SVG Icon (Bar chart style)
const DefaultSvgIcon: React.FC<{className?: string}> = ({ className }) => {
  const { theme } = useTheme();
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`${className || `w-6 h-6 ${theme.accentColor}`}`}
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zm6.75 3a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V7.5zm-3.75-1.5A.75.75 0 0011.25 6v12a.75.75 0 001.5 0V6a.75.75 0 00-.75-.75zM6 6.75A.75.75 0 016.75 6H7.5a.75.75 0 010 1.5H6.75A.75.75 0 016 6.75zM20.25 12a.75.75 0 01-.75.75h-.75a.75.75 0 010-1.5h.75a.75.75 0 01.75.75zM16.5 17.25a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
  );
};

const SkillIcon: React.FC<SkillIconProps> = ({ iconUrl, altText = "Skill icon", className }) => {
  const commonClasses = `object-contain ${className || 'w-6 h-6'}`; // Ensure className from props can override default size

  if (iconUrl) {
    return (
      <img 
        src={iconUrl} 
        alt={altText} 
        className={commonClasses}
        onError={(e) => { 
          // Fallback for broken image links
          const target = e.target as HTMLImageElement;
          target.style.display = 'none'; // Hide broken image
          // Optionally, replace with a placeholder or log error
          // For now, it will just be empty space if image fails to load.
          // To render the DefaultSvgIcon as fallback for broken images, state management would be needed here.
        }}
      />
    );
  }

  return <DefaultSvgIcon className={className || `w-6 h-6`} />;
};

export default SkillIcon;