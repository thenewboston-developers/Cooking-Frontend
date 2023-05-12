import Button, {ButtonColor} from 'components/Button';
import {useIsAuthenticated, useToggle} from 'hooks';
import EditAccountModal from 'modals/EditAccountModal';
import {SFC} from 'types';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const [editAccountModalIsOpen, toggleEditAccountModal] = useToggle(false);
  const isAuthenticated = useIsAuthenticated();

  const renderActionButtons = () => {
    if (!isAuthenticated) return null;

    return (
      <S.ButtonContainer>
        <Button color={ButtonColor.secondary} onClick={toggleEditAccountModal} text="Edit profile" />
      </S.ButtonContainer>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Img alt="image" src="https://avatars.githubusercontent.com/u/8547538?v=4" />
        <S.Name>Bucky Roberts</S.Name>
        {renderActionButtons()}
      </S.Container>
      {editAccountModalIsOpen ? <EditAccountModal close={toggleEditAccountModal} /> : null}
    </>
  );
};

export default Left;
