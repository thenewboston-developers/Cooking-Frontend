import Coin from 'assets/coin.png';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoinAmountProps {
  amount: number;
}

const CoinAmount: SFC<CoinAmountProps> = ({amount, className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="coin" src={Coin} />
      <S.Amount>{amount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default CoinAmount;
