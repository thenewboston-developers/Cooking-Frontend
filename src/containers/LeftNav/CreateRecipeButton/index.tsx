import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlus} from '@mdi/js';

import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const CreateRecipeButton: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(updateManager({activeRecipe: null}));
    navigate('/createEditRecipe');
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Icon path={mdiPlus} size="26px" />
      <S.Text>Create Recipe</S.Text>
    </S.Container>
  );
};

export default CreateRecipeButton;
