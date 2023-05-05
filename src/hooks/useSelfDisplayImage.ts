import {useSelector} from 'react-redux';

import DefaultAvatar from 'assets/default-avatar.png';
import {getSelf} from 'selectors/state';

const useSelfDisplayImage = () => {
  const self = useSelector(getSelf);

  return self.displayImage || DefaultAvatar;
};

export default useSelfDisplayImage;
