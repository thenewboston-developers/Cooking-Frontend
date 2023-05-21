import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';

export const Bumper = styled.div`
  margin-bottom: 32px;
`;

export const Card = styled.div`
  margin-top: 32px;
  padding: 16px;
`;

export const CloseButtonContainer = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 420px;
`;

export const Img = styled.img`
  max-height: 260px;
  max-width: 260px;
`;

export const ImgContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const Input = styled(UInput)`
  width: 100%;
`;
