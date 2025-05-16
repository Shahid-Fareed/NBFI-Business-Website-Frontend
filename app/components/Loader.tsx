import React from "react";
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 transition-all duration-300">
      <div className="w-16 h-16 border-4 border-awtgreen border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default React.memo(Loader);
