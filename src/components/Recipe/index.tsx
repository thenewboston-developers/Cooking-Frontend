import {useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

export interface RecipeProps {
  creatorAccountNumber: string;
  creatorDisplayImage: string;
  creatorDisplayName: string;
  description: string;
  imageUrl: string;
  name: string;
}

const Recipe: SFC<RecipeProps> = ({
  className,
  creatorAccountNumber,
  creatorDisplayImage,
  creatorDisplayName,
  description,
  imageUrl,
  name,
}) => {
  const self = useSelector(getSelf);

  const renderRight = () => {
    if (creatorAccountNumber !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: () => console.log(1)},
      {label: 'Delete', onClick: () => console.log(2)},
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
        <S.ImgWrapper>
          <S.Img alt="image" src={imageUrl} />
        </S.ImgWrapper>
      </S.ImgContainer>
      <S.Middle>
        <S.Name>{name}</S.Name>
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
