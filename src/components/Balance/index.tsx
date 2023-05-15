import Coin from 'assets/coin.png';
import {SFC} from 'types';
import * as S from './Styles';

export interface BalanceProps {
  balance: number;
}

const Balance: SFC<BalanceProps> = ({balance, className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="coin" src={Coin} />
      <S.Text>{balance.toLocaleString()}</S.Text>
    </S.Container>
  );
};

export default Balance;
