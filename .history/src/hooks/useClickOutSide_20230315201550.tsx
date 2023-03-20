import React, { useState, useRef, useEffect } from "react";

const useClickOutside = (dom = "button") => {
  const [open, setOpen] = useState(false);

  const nodeRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: React.ChangeEvent) => {
      if (nodeRef.current && !e.target.matches(dom)) {
        setOpen(false);
      }
    };
  }, []);

  return <div>useClickOutside</div>;
};

export default useClickOutside;
