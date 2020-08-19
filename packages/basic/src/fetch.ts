import AxiosClient from 'axios'
import qs from 'qs'

export class APIError {
  public code: number
  public message: string
  public context: any

  constructor(code: number, message: string, context?: any) {
    this.code = code
    this.message = message
    this.context = context
  }
}

export type ITransferDataType = 'json' | 'form-data'

export class TransferData {
    public data: any
    public type: ITransferDataType

    constructor(data: number, type: ITransferDataType = 'json') {
        this.data = data
        this.type = type
    }
}

export const proxy = AxiosClient.create({
    baseURL: '/api',
    timeout: 100000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformResponse: (resp) => {
        let body = resp?.body
        if (!body) {
            return body
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        // const xbody = {
        //     data: {}, // data // error
        //     code: -1,
        // }
        if (body.code === 0) {
            return body.data
        } else {
            throw new APIError(body.code || -1, body.data?.message, body)
        }
    },
    transformRequest: (params) => {
        if (params instanceof TransferData) {
            if (params.type === 'json') {
                return qs.stringify(params.data)
            }
            if (params.type === 'form-data') {
                const form = new FormData()
                Object.keys(params.data).forEach((key) => {
                    form.append(key, params.data[key])
                })
                return params.data
            }
        }
        return qs.stringify(params)
    },
})

proxy.interceptors.response.use(
    resp => resp,
    err => {
        if (err.isAxiosError) {
          const { response = {} } = err
          const axiosError = new APIError(response.status || -2, response.statusText, err)
          return Promise.reject(axiosError)
        }
      return Promise.reject(err)
    },
)
