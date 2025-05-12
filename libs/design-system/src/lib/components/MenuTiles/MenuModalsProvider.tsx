'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react';
import {
  ChangeDashboardNameModal,
  CopyDashboardModal,
  DeleteDashboardModal,
  NewDashboardModal,
} from './MenuModals';

// Define the modal names
export type ModalName =
  | 'changeDashboardName'
  | 'copyDashboard'
  | 'newDashboard'
  | 'deleteDashboard'
  | null;

// Context interface
interface ModalContextValue {
  modalName: ModalName;
  openModal: (name: Exclude<ModalName, null>) => void;
  closeModal: () => void;
}

// Create context
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Provider props
interface ModalProviderProps {
  children: ReactNode;
}

// ModalProvider component
export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalName, setModalName] = useState<ModalName>(null);

  const openModal = (name: Exclude<ModalName, null>) => {
    setModalName(name);
  };

  const closeModal = () => {
    setModalName(null);
  };

  return (
    <ModalContext.Provider value={{ modalName, openModal, closeModal }}>
      {children}
      {/* Render all modal components here */}
      <ChangeDashboardNameModal
        isOpen={modalName === 'changeDashboardName'}
        onClose={closeModal}
      />
      <CopyDashboardModal
        isOpen={modalName === 'copyDashboard'}
        onClose={closeModal}
      />
      <NewDashboardModal
        isOpen={modalName === 'newDashboard'}
        onClose={closeModal}
      />
      <DeleteDashboardModal
        isOpen={modalName === 'deleteDashboard'}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMenuModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
