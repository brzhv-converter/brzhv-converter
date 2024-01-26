import React, { useCallback, useEffect } from 'react';
import { findDOMNode } from "react-dom";

const OutSideClick = ({
  children,
  className,
  onClick,
  onBlur,
  isOpen,
  rootSelector,
  preventTouchOnMobile,
  eventToHandle = "click"
}) => {
  const ref = React.useRef(null);

  const handleDocumentClick = useCallback((event) => {
    const node = findDOMNode(ref.current);
    if(isOpen && node && !node.contains(event.target)) {
      onClick(event);
    }
  }, [ref, onClick, isOpen]);

  useEffect(() => {
    const doc = (rootSelector && document.body.querySelector(rootSelector)) || document;

    doc.addEventListener(eventToHandle, handleDocumentClick, false);
    // doc.addEventListener("touchstart", handleDocumentClick, false);

    return () => {
      doc.removeEventListener(eventToHandle, handleDocumentClick, false);
      // doc.removeEventListener("touchstart", handleDocumentClick, false);
    };
  }, [handleDocumentClick, rootSelector, eventToHandle]);

  return (
    <div
      ref={ref}
      className={className}
      onBlur={onBlur}
      onTouchStartCapture={(event) => {
        if(preventTouchOnMobile){
          event.stopPropagation()
        }
      }}
    >
      {children}
    </div>
  );
}

export default OutSideClick;