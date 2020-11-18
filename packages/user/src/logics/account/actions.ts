import { ACCOUNT_ACTION, ACCOUNT_ASYNC_ACTION } from './enums'
import { accountApi } from '../../apis/account'
import { securityApi } from '../../apis/security'
import { createPayloadAction } from '@react-kits/redux'

export const accountAction = {
  setInfo: createPayloadAction(ACCOUNT_ACTION.SET_INFO),
}

export const accountAsyncAction = {
  getInfo: () => ({
    type: ACCOUNT_ASYNC_ACTION.GET_INFO,
    target: () => accountApi.getInfo(),
    failure: ACCOUNT_ACTION.SET_ERROR,
    success: accountAction.setInfo,
  }),
  login: (account: string, password: string) => ({
    type: ACCOUNT_ASYNC_ACTION.LOGIN,
    meta: { account, password },
    target: (meta: any) => accountApi.login(meta),
    success: accountAction.setInfo,
  }),
  logout: () => ({
    type: ACCOUNT_ASYNC_ACTION.LOGIN,
    target: accountApi.logout,
    success: accountAction.setInfo,
  }),
  sendCode: (target: string, scene: string) => ({
    type: ACCOUNT_ASYNC_ACTION.SEND_CODE,
    meta: { target, scene },
    target: securityApi.sendCode,
  }),
  verifyCode: (code: string, scene: string) => ({
    type: ACCOUNT_ASYNC_ACTION.VERIFY_CODE,
    meta: { code, scene },
    target: securityApi.verifyCode,
    success: accountAction.setInfo,
  }),
}
