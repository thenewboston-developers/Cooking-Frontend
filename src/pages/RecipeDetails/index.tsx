import {mdiDotsVertical} from '@mdi/js';

import Detail from 'components/Detail';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {SFC} from 'types';
import * as S from './Styles';

const RecipeDetails: SFC = ({className}) => {
  const renderDescription = () => {
    return (
      <>
        <S.SectionLabel>Description</S.SectionLabel>
        <S.SectionContent>
          Mushroom Risotto with Truffle Oil is a rich and savory Italian dish that's perfect for a cozy night in. This
          dish features creamy and tender Arborio rice cooked with a flavorful combination of sautéed mushrooms, garlic,
          onion, white wine, and parmesan cheese. To take this dish to the next level, a drizzle of aromatic truffle oil
          is added at the end, adding a decadent and earthy flavor that perfectly complements the richness of the
          risotto. The result is a comforting and indulgent dish that's sure to please any mushroom lover or food
          enthusiast. Serve it as a main course or as a side dish to impress your guests at your next dinner party.
        </S.SectionContent>
      </>
    );
  };

  const renderTopLeft = () => {
    return (
      <S.TopLeft>
        <S.Name>Mushroom Risotto with Truffle Oil</S.Name>
        <S.Details>
          <Detail label="Created" value="5/9/23" />
          <Detail label="Modified" value="5/12/23" />
        </S.Details>
      </S.TopLeft>
    );
  };

  const renderTopRight = () => {
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

  return (
    <S.Container className={className}>
      <S.Card>
        {renderTop()}
        <S.Img
          alt="image"
          src="https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg?auto=compress&cs=tinysrgb&w=1600"
        />
        {renderDescription()}
      </S.Card>
    </S.Container>
  );
};

export default RecipeDetails;
