import type { RequestOptions } from 'ivy2'
import type { AxiosResponse } from 'axios'
import { createAxios, checkStatus } from 'ivy2'
import { notify } from './utils'

export const http = createAxios({
  requestOptions: {
    isTransformResponse: false,
  },
  transform: {
    transformRequestHook(res: AxiosResponse, options: RequestOptions) {
      const { isTransformResponse, isReturnNativeResponse } = options
      // 是否返回原生响应头，当下载获取header中的文件名时会用到
      if (isReturnNativeResponse) {
        return res
      }
      // 是否对响应结果进行处理，当不处理时
      if (!isTransformResponse) {
        return res.data
      }
    },

    /**
     * @description response报错处理
     * @param error
     */
    responseInterceptorsCatch: (error: any) => {
      const { response, code, message, config } = error || {}
      const errorMsgMode = config?.requestOptions?.errorMessageMode || 'none'
      const msg: string = response?.data?.error?.message ?? ''
      const err: string = error?.toString() ?? ''
      let errMsg = ''
      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          errMsg = '接口请求超时，请刷新页面重试!'
        }
        if (err?.includes('Network Error')) {
          errMsg = '网络异常，请检查您的网络连接是否正常'
        }
        if (errMsg) {
          return Promise.reject(error)
        }
      } catch (error) {
        throw new Error(error as unknown as string)
      }

      const { errMessage } = checkStatus(
        error?.response?.status,
        msg,
        errorMsgMode
      )
      notify(errMessage)
      return Promise.reject(error)
    },
  },
})
