import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, hasCloseBtn, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  /// @dev This is a custom hook that handles the opening and closing of the modal.
  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  /// @dev This is a custom hook that handles the closing of the modal when clicking outside of it.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        event.stopPropagation();

        handleCloseModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleCloseModal = () => {
    if (onClose) onClose();
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") handleCloseModal();
  };

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="h-2/3 w-[30rem] rounded-2xl">
      {hasCloseBtn && (
        <button className="absolute right-5 top-5" onClick={handleCloseModal}>
          <IoCloseOutline className="h-10 w-10 stroke-neutral-700 ease-in-out hover:stroke-neutral-500" />
        </button>
      )}
      <div ref={ref} className="h-full py-3">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
