import {configureStore} from '@reduxjs/toolkit';

import authenticationReducer from 'store/authentication';
import managerReducer from 'store/manager';
import selfReducer from 'store/self';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    manager: managerReducer,
    self: selfReducer,
  },
});

export default store;
