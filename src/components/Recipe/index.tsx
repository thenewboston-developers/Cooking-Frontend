import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

export interface RecipeProps {
  creatorAccountNumber: string;
  creatorDisplayImage: string;
  creatorDisplayName: string;
  description: string;
  handleDelete: (id: number) => void;
  id: number;
  imageUrl: string;
  name: string;
}

const Recipe: SFC<RecipeProps> = ({
  className,
  creatorAccountNumber,
  creatorDisplayImage,
  creatorDisplayName,
  description,
  handleDelete,
  id,
  imageUrl,
  name,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, authorizationHeaders());
      handleDelete(id);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting the recipe');
    }
  };

  const handleEditClick = () => {
    const activeRecipe = {
      description,
      id,
      imageUrl,
      name,
    };

    dispatch(updateManager({activeRecipe}));
    navigate('/createEditRecipe');
  };

  const renderRight = () => {
    if (creatorAccountNumber !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: handleEditClick},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return (
      <S.Right>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      <S.ImgContainer>
        <Link to={`/recipe/${id}`}>
          <S.ImgWrapper>
            <S.Img alt="image" src={imageUrl} />
          </S.ImgWrapper>
        </Link>
      </S.ImgContainer>
      <S.Middle>
        <Link to={`/recipe/${id}`}>
          <S.Name>{name}</S.Name>
        </Link>
        <S.Description>{description}</S.Description>
        <S.AccountCard
          accountNumber={creatorAccountNumber}
          displayImage={creatorDisplayImage}
          displayName={creatorDisplayName}
        />
      </S.Middle>
      {renderRight()}
    </S.Container>
  );
};

export default Recipe;
