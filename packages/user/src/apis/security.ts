import { FetchAPI } from '@smoex-business/basic'

type ISendCodeParams = {
  target: string
}

type IVerifyCodeParams = {
  code: number
  scene: 'login' | 'register'
}

export class SecurityAPI extends FetchAPI {
  sendCode(params: ISendCodeParams){
    return this.proxy.post('/security/sendcode', params)
  }
  verifyCode(params: IVerifyCodeParams) {
    return this.proxy.post('/security/verifycode', params)
  }
}
export const securityApi = new SecurityAPI()
