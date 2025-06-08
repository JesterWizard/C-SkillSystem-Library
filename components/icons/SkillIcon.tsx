
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SkillIconProps {
  className?: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ className }) => {
  const { theme } = useTheme();
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`w-4 h-4 ${className || theme.accentColor}`} // 16x16 equivalent for Tailwind is w-4 h-4
    >
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zm6.75 3a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V7.5zm-3.75-1.5A.75.75 0 0011.25 6v12a.75.75 0 001.5 0V6a.75.75 0 00-.75-.75zM6 6.75A.75.75 0 016.75 6H7.5a.75.75 0 010 1.5H6.75A.75.75 0 016 6.75zM20.25 12a.75.75 0 01-.75.75h-.75a.75.75 0 010-1.5h.75a.75.75 0 01.75.75zM16.5 17.25a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
  );
};

export default SkillIcon;
    