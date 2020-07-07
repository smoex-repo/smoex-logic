import AxiosClient, { AxiosInstance } from 'axios'
import * as qs from 'qs'

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

type IFetchConfig = {
    axiosClient?: AxiosInstance
}

let fetchConfig: IFetchConfig = {}

export function configureFetch(config: IFetchConfig) {
    fetchConfig = { ...fetchConfig, ...config }
}

export const withFormData = (params: any) => {
    const formData = new FormData()
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key])
    })
    return formData
}

export const proxyClient = createClient('/api')
export const apiClient = createClient('https://api.smoex.com')

export const proxy = new Proxy(proxyClient, {
    get(target, prop) {
        const { axiosClient } = fetchConfig
        return (axiosClient || target as any)[prop]
    },
})

export function createClient(baseURL: string) {
    const client = AxiosClient.create({
        baseURL,
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
            // const xbody = {
            //     data: {}, // data // error
            //     code: -1,
            // }
            if (body.code === 0) {
                return body.data
            } else {
                // return data
                throw new APIError(body.code || -1, body.data.message, body)
            }
        },
        transformRequest: (params) => {
            if (params instanceof FormData) {
                return params
            }
            return qs.stringify(params)
        },
    })
    client.interceptors.response.use(
        (response) => {
          return response.data
        },
        (error) => {
            if (error.isAxiosError) {
              const { response = {} } = error
              const axiosError = new APIError(response.status || -1, response.statusText, error)
              return Promise.reject(axiosError)
            }
          return Promise.reject(error)
        },
    )
    return client
}
