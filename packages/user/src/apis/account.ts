import { proxy } from '@smoex-business/basic'

type IAccountLoginParams = {
  account: string
  password: string
}

export const accountApi = {
  getInfo() {
    return proxy.get('/account/info')
  },
  logout() {
    return proxy.get('/account/logout')
  },
  login(params: IAccountLoginParams) {
    return proxy.post('/account/login', params)
  },
  register(params: any) {
    return proxy.post('/account/register', params)
  }
}
