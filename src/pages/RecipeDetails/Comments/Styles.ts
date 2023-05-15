import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {cardStyle} from 'styles';

export const Button = styled(UButton)`
  margin-left: 12px;
`;

export const CommentListLength = styled.div``;

export const Container = styled.div`
  ${cardStyle};
  margin-top: 20px;
  padding: 16px;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  margin-top: 20px;
`;

export const InlineInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;
`;

export const Overview = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
