import CopyContainer from 'components/CopyContainer';
import Qr from 'components/Qr';
import {SFC} from 'types';
import * as S from './Styles';

export interface QrCopyProps {
  text: string;
  width?: number;
}

const QrCopy: SFC<QrCopyProps> = ({className, text, width = 120}) => {
  return (
    <S.Container className={className}>
      <Qr text={text} width={width} />
      <CopyContainer text={text} />
    </S.Container>
  );
};

export default QrCopy;
