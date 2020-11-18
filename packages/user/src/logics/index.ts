import { createSlice } from '@react-kits/redux'
import { accountReducer } from './account'
export * from './account/reducers'

export const userSlice = createSlice('common/user', {
  account: accountReducer,
})
