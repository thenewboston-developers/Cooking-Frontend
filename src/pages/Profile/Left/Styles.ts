import styled from 'styled-components';

import UCoinAmount from 'components/CoinAmount';
import UCopyContainer from 'components/CopyContainer';
import {fonts} from 'styles';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const CoinAmount = styled(UCoinAmount)`
  margin-top: 4px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CopyContainer = styled(UCopyContainer)`
  background: #fcfcfc;
  border: 1px solid rgb(207, 217, 222);
`;

export const Img = styled.img`
  border-radius: 6px;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`;

export const Label = styled.div`
  font-size: 12px;
  margin: 16px 0 4px;
`;

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
  margin-top: 12px;
`;
