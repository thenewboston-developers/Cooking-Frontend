import styled from 'styled-components';

import UCoinAmount from 'components/CoinAmount';
import UCopyContainer from 'components/CopyContainer';
import {fonts} from 'styles';

export const ButtonContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CoinAmount = styled(UCoinAmount)`
  margin-top: 4px;
`;

export const Container = styled.div`
  display: flex;
  padding: 32px 16px 24px;
`;

export const CopyContainer = styled(UCopyContainer)`
  background: #fcfcfc;
  border: 1px solid rgb(207, 217, 222);
  max-width: 280px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 160px;
`;

export const Label = styled.div`
  font-size: 12px;
  margin: 16px 0 4px;
`;

export const Left = styled.div``;

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
  margin-top: 12px;
`;

export const Right = styled.div`
  display: flex;
  flex: 1;
  margin: 0 12px;
`;

export const UserInformation = styled.div``;
