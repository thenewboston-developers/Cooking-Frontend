import Button, {ButtonColor} from 'components/Button';
import {useIsAuthenticated} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();

  const renderActionButtons = () => {
    if (!isAuthenticated) return null;

    return (
      <S.ButtonContainer>
        <Button color={ButtonColor.secondary} onClick={() => {}} text="Edit profile" />
      </S.ButtonContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Img alt="image" src="https://avatars.githubusercontent.com/u/8547538?v=4" />
      <S.Name>Bucky Roberts</S.Name>
      {renderActionButtons()}
    </S.Container>
  );
};

export default Left;
