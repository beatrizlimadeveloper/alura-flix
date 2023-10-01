import React, { useContext, createContext, useState } from "react";

const ModalFormContext = createContext();

export function useModalFormContext() {
  return useContext(ModalFormContext);
}

export function ModalFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalFormContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalFormContext.Provider>
  );
}
