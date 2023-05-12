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
  return (
    <S.Container className={className}>
      <S.ImgContainer>
        <S.ImgWrapper>
          <S.Img alt="image" src={imageUrl} />
        </S.ImgWrapper>
      </S.ImgContainer>
      <S.Right>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
        <S.AccountCard
          accountNumber={creatorAccountNumber}
          displayImage={creatorDisplayImage}
          displayName={creatorDisplayName}
        />
      </S.Right>
    </S.Container>
  );
};

export default Recipe;
