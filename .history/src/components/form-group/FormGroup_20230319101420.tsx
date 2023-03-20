import React from "react";

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-2 mb-4 peer-last:mb-0 lg:gap-y-3  lg:mb-5">
      {children}
    </div>
  );
};

export default FormGroup;
