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
  onActions?: {
    newDashboard?: (data: {
      input?: string;
      checked?: boolean;
    }) => Promise<void>;
    deleteDashboard?: (data: {
      input?: string;
      checked?: boolean;
    }) => Promise<void>;
    changeDashboardName?: (data: { input?: string }) => Promise<void>;
    copyDashboard?: (data: {
      input?: string;
      checked?: boolean;
    }) => Promise<void>;
  };
}

// Provider component
export const ModalProvider: FC<ModalProviderProps> = ({
  children,
  onActions,
}) => {
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
        onConfirm={async (data) => {
          if (onActions?.changeDashboardName) {
            await onActions.changeDashboardName(data);
          }
        }}
      />
      <CopyDashboardModal
        isOpen={modalName === 'copyDashboard'}
        onClose={closeModal}
        onConfirm={async (data) => {
          if (onActions?.copyDashboard) {
            await onActions.copyDashboard(data);
          }
        }}
      />
      <NewDashboardModal
        isOpen={modalName === 'newDashboard'}
        onClose={closeModal}
        onConfirm={async (data) => {
          if (onActions?.newDashboard) {
            await onActions.newDashboard(data);
          }
        }}
      />
      <DeleteDashboardModal
        isOpen={modalName === 'deleteDashboard'}
        onClose={closeModal}
        onConfirm={async (data) => {
          if (onActions?.deleteDashboard) {
            await onActions.deleteDashboard(data);
          }
        }}
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
