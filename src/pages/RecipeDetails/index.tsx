import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {mdiDotsVertical} from '@mdi/js';

import AccountCard from 'components/AccountCard';
import Detail from 'components/Detail';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import Loader from 'components/Loader';
import {getSelf} from 'selectors/state';
import {RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const RecipeDetails: SFC = ({className}) => {
  const [recipe, setRecipe] = useState<RecipeReadSerializer | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {id} = useParams();
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<RecipeReadSerializer>(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching recipe');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [id]);

  const renderDescription = () => {
    return (
      <>
        <S.SectionLabel>Description</S.SectionLabel>
        <S.SectionContent>{recipe!.description}</S.SectionContent>
      </>
    );
  };

  const renderTopLeft = () => {
    return (
      <S.TopLeft>
        <S.Name>{recipe!.name}</S.Name>
        <S.Details>
          <Detail label="Created" value={recipe!.created_date} />
          <Detail label="Modified" value={recipe!.modified_date} />
        </S.Details>
      </S.TopLeft>
    );
  };

  const renderTopRight = () => {
    if (recipe!.creator.account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: () => console.log(1)},
      {label: 'Delete', onClick: () => console.log(2)},
    ];

    return (
      <S.TopRight>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.TopRight>
    );
  };

  const renderTop = () => {
    return (
      <S.Top>
        {renderTopLeft()}
        {renderTopRight()}
      </S.Top>
    );
  };

  if (requestPending) {
    return (
      <S.EmptyStateWrapper>
        <Loader />
      </S.EmptyStateWrapper>
    );
  }

  if (!recipe) {
    return (
      <S.EmptyStateWrapper>
        <div>No recipe to display</div>
      </S.EmptyStateWrapper>
    );
  }

  return (
    <S.Container className={className}>
      <S.Left>
        <S.Card>
          {renderTop()}
          <S.Img alt="image" src={recipe.image_url} />
          {renderDescription()}
        </S.Card>
      </S.Left>
      <S.Right>
        <S.Card>
          <AccountCard
            accountNumber={recipe.creator.account_number}
            displayImage={recipe.creator.display_image}
            displayName={recipe.creator.display_name}
          />
        </S.Card>
      </S.Right>
    </S.Container>
  );
};

export default RecipeDetails;
