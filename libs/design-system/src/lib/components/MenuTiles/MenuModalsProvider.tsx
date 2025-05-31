'use client';

import React, { createContext, useContext, ReactNode, FC } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import {
  ChangeDashboardNameModal,
  CopyDashboardModal,
  DeleteDashboardModal,
  NewDashboardModal,
} from './MenuModals';

// Define modal names
export type ModalName =
  | 'changeDashboardName'
  | 'copyDashboard'
  | 'newDashboard'
  | 'deleteDashboard'
  | null;

// Modal state key
const MODAL_STATE_KEY = ['activeModal'];

// Context interface
interface ModalContextValue {
  openModal: (name: Exclude<ModalName, null>) => void;
  closeModal: () => void;
}

// Create context
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Provider props
interface ModalProviderProps {
  children: ReactNode;
}

// Provider component
export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  // Read modal state from React Query cache
  const { data: modalName = null } = useQuery<ModalName>({
    queryKey: MODAL_STATE_KEY,
    queryFn: () => null, // default to null
    staleTime: Infinity,
    initialData: null,
  });

  const openModal = (name: Exclude<ModalName, null>) => {
    queryClient.setQueryData(MODAL_STATE_KEY, name);
  };

  const closeModal = () => {
    queryClient.setQueryData(MODAL_STATE_KEY, null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

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

// Custom hook to consume modal context
export const useMenuModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useMenuModal must be used within a ModalProvider');
  }
  return context;
};
