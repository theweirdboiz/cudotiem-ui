import React from "react";

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-3 mb-4 lg:mb-5">
      {children}
    </div>
  );
};

export default FormGroup;
