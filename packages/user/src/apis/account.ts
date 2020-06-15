import { FetchAPI } from '@smoex-business/basic'

type IAccountLoginParams = {
  account: string
  password: string
}

export class AccountAPI extends FetchAPI {
  getInfo() {
    return this.proxy.get('/account/info')
  }
  logout() {
    return this.proxy.get('/account/logout')
  }
  login(params: IAccountLoginParams) {
    return this.proxy.post('/account/login', params)
  }
  register(params: any) {
    return this.proxy.post('/account/register', params)
  }
}
export const accountApi = new AccountAPI()
