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

// export const withFormData = (params: any) => {
//     return new TransferData(params, 'form-data')
// }


// type IFetchConfig = {
//     axiosClient?: AxiosInstance
// }

// let fetchConfig: IFetchConfig = {}

// export function configureFetch(config: IFetchConfig) {
//     fetchConfig = { ...fetchConfig, ...config }
// }

export const proxy = AxiosClient.create({
    baseURL: '/api',
    timeout: 100000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformResponse: (body) => {
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
            // return data
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
    resp => {
        return resp.data
    },
    err => {
        if (err.isAxiosError) {
          const { response = {} } = err
          const axiosError = new APIError(response.status || -2, response.statusText, err)
          return Promise.reject(axiosError)
        }
      return Promise.reject(err)
    },
)

// export function transformToNodeClient() {

// }
// export const apiClient = createClient('https://api.smoex.com')

// export const proxy = new Proxy(proxyClient, {
//     get(target, prop) {
//         const { axiosClient } = fetchConfig
//         return (axiosClient || target as any)[prop]
//     },
// })

// export function createClient(baseURL: string) {
//     const client = 
//     return client
// }
