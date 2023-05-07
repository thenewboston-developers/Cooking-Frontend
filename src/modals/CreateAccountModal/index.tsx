import Modal from 'components/Modal';
import QrCopy from 'components/QrCopy';
import {SFC} from 'types';

export interface CreateAccountModalProps {
  close(): void;
}

const CreateAccountModal: SFC<CreateAccountModalProps> = ({className, close}) => {
  return (
    <Modal className={className} close={close} header="New Account Created!">
      <QrCopy text="f614e1ff3b633e9702e220725c41af3fc52f846d5cc8c38c26bd2c13952e8031" />
    </Modal>
  );
};

export default CreateAccountModal;
