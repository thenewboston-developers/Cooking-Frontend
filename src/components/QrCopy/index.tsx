import CopyToClipboard from 'react-copy-to-clipboard';

import Qr from 'components/Qr';
import {ToastType} from 'enums';
import {SFC} from 'types';
import {displayToast} from 'utils/toast';
import * as S from './Styles';

export interface QrCopyProps {
  text: string;
  width?: number;
}

const QrCopy: SFC<QrCopyProps> = ({className, text, width = 120}) => {
  const handleCopy = (): void => {
    displayToast('Copied to the clipboard', ToastType.success);
  };

  return (
    <S.Container className={className}>
      <Qr text={text} width={width} />
      <S.CopyContainer>
        <S.Text>{text}</S.Text>
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <S.CopyText>Copy</S.CopyText>
        </CopyToClipboard>
      </S.CopyContainer>
    </S.Container>
  );
};

export default QrCopy;
