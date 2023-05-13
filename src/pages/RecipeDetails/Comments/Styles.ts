import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {cardStyle} from 'styles';

export const Button = styled(UButton)`
  margin-left: 12px;
`;

export const Container = styled.div`
  ${cardStyle};
  margin-top: 20px;
  padding: 16px;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  margin-top: 16px;
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
  width: 36px;
`;

export const InlineInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;
`;
