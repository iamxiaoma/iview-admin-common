import Mock from 'mockjs'

/**
 * 模块的接口模拟请求
 */

const nameArr = ['推荐分类', '热门分类', '特惠分类', '精选分类', '美妆护肤', '箱包手袋', '钟表珠宝', '家用电器']
const statusArr = [1, 2]
const statusNameArr = ['启用', '禁用']

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100 - 500
})

/**
 * 获取列表
 */
Mock.mock(/\/product_category\/list/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)

  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data|3-5': [{
      'id|+1': 1,
      'parent_id|1-10': 1,
      'name|1': nameArr,
      'path|1': nameArr,
      'level': 1,
      'sort|1-100': 1,
      'status|1': statusArr,
      'status_name|1': statusNameArr,
      'create_time': '@datetime',
      'children_count|0-5': 1,
      'children|0-5': [{
        'id|+1': 100,
        'parent_id|1-10': 1,
        'name|1': nameArr,
        'path|1': nameArr,
        'level': 2,
        'sort|1-100': 1,
        'status|1': statusArr,
        'status_name|1': statusNameArr,
        'create_time': '@datetime',
        'children_count|0-5': 1,
        'children|0-5': [{
          'id|+1': 1000,
          'parent_id|1-10': 1,
          'name|1': nameArr,
          'path|1': nameArr,
          'level': 3,
          'sort|1-100': 1,
          'status|1': statusArr,
          'status_name|1': statusNameArr,
          'create_time': '@datetime',
          'children_count': 0
        }]
      }]
    }]
  }

  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 新增
 */
Mock.mock(/\/product_category\/add/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 编辑
 */
Mock.mock(/\/product_category\/edit/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 删除
 */
Mock.mock(/\/product_category\/del/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 详情
 */
Mock.mock(/\/product_category\/detail/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'id|+1': 1,
      'parent_id|1-10': 1,
      'name|1': nameArr,
      'path|1': nameArr,
      'level': 1,
      'sort|1-100': 1,
      'status|1': statusArr,
      'status_name|1': statusNameArr,
      'create_time': '@datetime'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
