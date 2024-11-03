import React from "react";

function LoadingModal({ show }) {
  if (!show) {
    return null; // Don't render anything if show is false
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <p className="mt-4 text-center text-gray-800">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingModal;