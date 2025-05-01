import React from 'react';

const ChangeDashboardModal: React.FC = () => {
  return <div>ComponentName</div>;
};
const DeleteDashboardModal: React.FC = () => {
  return <div>ComponentName</div>;
};
const NewDashboardModal: React.FC = () => {
  return <div>ComponentName</div>;
};
const CopyDashboardModal: React.FC = () => {
  return <div>ComponentName</div>;
};
type ModalName =
  | 'ChangeDashboardModal'
  | 'DeleteDashboardModal'
  | 'NewDashboardModal'
  | 'CopyDashboardModal';

type ModalRendererProps = {
  modalName: ModalName | null;
  modalProps?: any;
  onClose: () => void;
};

const MenuModals: React.FC<ModalRendererProps> = ({
  modalName,
  modalProps,
  onClose,
}) => {
  if (!modalName) return null;

  const modals: Record<ModalName, React.FC<any>> = {
    ChangeDashboardModal,
    DeleteDashboardModal,
    NewDashboardModal,
    CopyDashboardModal,
  };

  const SelectedModal = modals[modalName];
  return <SelectedModal {...modalProps} onClose={onClose} />;
};
