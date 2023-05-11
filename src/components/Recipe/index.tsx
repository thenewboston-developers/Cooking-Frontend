import {SFC} from 'types';
import * as S from './Styles';

export interface RecipeProps {
  description: string;
  imageUrl: string;
  name: string;
}

const Recipe: SFC<RecipeProps> = ({className, description, imageUrl, name}) => {
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
      </S.Right>
    </S.Container>
  );
};

export default Recipe;
