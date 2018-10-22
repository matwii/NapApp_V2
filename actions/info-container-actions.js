import { CHANGE_ADDRESS } from './action-types';

export const changeAddress = (type: String) => (
  {
    type: CHANGE_ADDRESS,
    payload: { type },
  }
);
