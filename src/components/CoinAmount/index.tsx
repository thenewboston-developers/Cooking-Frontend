import Coin from 'assets/coin.png';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoinAmountProps {
  amount: number;
  onClick?: () => void;
}

const CoinAmount: SFC<CoinAmountProps> = ({amount, className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Img alt="coin" src={Coin} />
      <S.Amount>{amount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default CoinAmount;
