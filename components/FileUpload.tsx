
import React, { ChangeEvent, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  label: string;
  accept: string; // e.g., ".csv", ".json"
  idSuffix?: string; // For unique input ids if multiple on page
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, label, accept, idSuffix = 'file' }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
       if (fileInputRef.current) { // Reset file input to allow uploading the same file again
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-input-${idSuffix}`}
        ref={fileInputRef}
        disabled={isLoading}
      />
      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-labelledby={`file-upload-label-${idSuffix}`}
        className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ease-in-out whitespace-nowrap ${theme.buttonBg} ${theme.buttonText} ${isLoading ? 'opacity-50 cursor-not-allowed' : theme.buttonHoverBg}`}
      >
        {isLoading ? 'Processing...' : label}
      </button>
      {/* Optional: <p id={`file-upload-label-${idSuffix}`} className={`text-xs ${theme.textSecondary}`}>Upload your skills {accept} file.</p> */}
    </div>
  );
};

export default FileUpload;
