import axios from '@/libs/api.request'

/**
 * 模块的接口请求
 * @type {{add: (function(*=): (*|never)), edit: (function(*=): (*|never)), del: (function(*=): (*|never)), detail: (function(*=): (*|never)), list: (function(*=): (*|never))}}
 */
export const upload = {
  single: function (_params) {
    return axios.request({
      url: 'upload/single',
      data: _params,
      method: 'post'
    })
  },
  ueditor: function (_params) {
    return axios.request({
      url: 'upload/ueditor',
      data: _params,
      method: 'get'
    })
  }
}
