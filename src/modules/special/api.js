import axios from '@/libs/api.request'

/**
 * 模块的接口请求
 * @type {{add: (function(*=): (*|never)), edit: (function(*=): (*|never)), del: (function(*=): (*|never)), detail: (function(*=): (*|never)), list: (function(*=): (*|never))}}
 */
export const special = {
  list: function (_params) {
    return axios.request({
      url: 'special/list',
      data: _params,
      method: 'get'
    })
  },
  add: function (_params) {
    return axios.request({
      url: 'special/add',
      data: _params,
      method: 'post'
    })
  },
  edit: function (_params) {
    return axios.request({
      url: 'special/edit',
      data: _params,
      method: 'post'
    })
  },
  detail: function (_params) {
    return axios.request({
      url: 'special/detail',
      data: _params,
      method: 'get'
    })
  },
  del: function (_params) {
    return axios.request({
      url: 'special/del',
      data: _params,
      method: 'post'
    })
  }
}
