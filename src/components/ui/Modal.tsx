import React from "react";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  className?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal"
      className={`fixed inset-0 flex items-center justify-center bg-overlay bg-opacity-50 z-50 ${className}`}
    >
      <div className="border-effect bg-secondaryBlack p-6 w-11/12 md:w-1/2 lg:w-1/2 max-h-[600px] h-fit overflow-y-auto ">
        <CloseIcon onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
