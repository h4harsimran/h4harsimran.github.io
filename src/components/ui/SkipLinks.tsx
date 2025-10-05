import React from 'react';
import { useSkipLinks } from '../../hooks/useFocusManagement';
import { skipLinkClass } from '../../utils/accessibility';

const SkipLinks: React.FC = () => {
  const { skipToContent, skipToNavigation } = useSkipLinks();

  return (
    <div className="skip-links">
      <button
        onClick={skipToContent}
        className={skipLinkClass}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            skipToContent();
          }
        }}
      >
        Skip to main content
      </button>
      <button
        onClick={skipToNavigation}
        className={skipLinkClass}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            skipToNavigation();
          }
        }}
      >
        Skip to navigation
      </button>
    </div>
  );
};

export default SkipLinks;
