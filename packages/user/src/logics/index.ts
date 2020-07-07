import { createSlice } from 'redux-async-kit'
import { accountReducer } from './account'
export * from './account/reducers'

export const userSlice = createSlice('common/user', {
  account: accountReducer,
})
