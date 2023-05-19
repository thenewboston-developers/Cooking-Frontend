import {useSelector} from 'react-redux';

import Coin from 'assets/coin.png';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const Balance: SFC = ({className}) => {
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <S.Img alt="coin" src={Coin} />
      <S.Amount>{self.balance.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default Balance;
