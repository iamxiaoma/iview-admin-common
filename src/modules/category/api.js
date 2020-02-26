import axios from '@/libs/api.request'

/**
 * 模块的接口请求
 * @type {{add: (function(*=): (*|never)), edit: (function(*=): (*|never)), del: (function(*=): (*|never)), detail: (function(*=): (*|never)), list: (function(*=): (*|never))}}
 */
export const category = {
  list: function (_params) {
    return axios.request({
      url: 'product_category/list',
      data: _params,
      method: 'get'
    })
  },
  add: function (_params) {
    return axios.request({
      url: 'product_category/add',
      data: _params,
      method: 'post'
    })
  },
  edit: function (_params) {
    return axios.request({
      url: 'product_category/edit',
      data: _params,
      method: 'post'
    })
  },
  detail: function (_params) {
    return axios.request({
      url: 'product_category/detail',
      data: _params,
      method: 'get'
    })
  },
  del: function (_params) {
    return axios.request({
      url: 'product_category/del',
      data: _params,
      method: 'post'
    })
  }
}
