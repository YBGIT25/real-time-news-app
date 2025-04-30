import React from 'react';
import './Spinner.css'; // Ensure you have some CSS for the spinner (create the file if not).

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="loading-spinner"></div>  {/* CSS for spinner animation */}
    </div>
  );
};

export default Spinner;
