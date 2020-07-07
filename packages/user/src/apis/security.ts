import { proxy } from '@smoex-business/basic'

type ISendCodeParams = {
  target: string
}

type IVerifyCodeParams = {
  code: number
  scene: 'login' | 'register'
}

export const securityApi = {
  sendCode(params: ISendCodeParams){
    return proxy.post('/security/sendcode', params)
  },
  verifyCode(params: IVerifyCodeParams) {
    return proxy.post('/security/verifycode', params)
  },
}
