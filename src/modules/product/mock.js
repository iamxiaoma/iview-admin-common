import Mock from 'mockjs'

/**
 * 模块的接口模拟请求
 */

const categoryNameArr = ['推荐分类', '热门分类', '特惠分类', '精选分类', '美妆护肤', '箱包手袋', '钟表珠宝', '家用电器']
const statusArr = [1, 2]
const statusNameArr = ['启用', '禁用']
const isReturnArr = ['可退货', '不可退货']

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100 - 500
})

/**
 * 获取列表
 */
Mock.mock(/\/product\/list/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let list = `list|${req['pageSize']}`
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'total_rows|100-1000': 100
    }
  }
  template['data'][list] = [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'category_id|1-100': 1,
    'category_name|1': categoryNameArr,
    'name': '@ctitle',
    'ad_img': '@image(\'200x200\')',
    'sale_price|1-1000.2': 1,
    'market_price|1-1000.2': 1,
    'cost_price|1-1000.2': 1,
    'stock|1-1000': 1,
    'sale_num|1-1000': 1,
    'status|1': statusArr,
    'status_name|1': statusNameArr,
    'is_return|1': isReturnArr,
    'create_user': '@cname',
    'create_time': '@datetime',
    'update_time': '@datetime',
    'update_user': '@cname'
  }]
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 新增
 */
Mock.mock(/\/product\/add/, req => {
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
Mock.mock(/\/product\/edit/, req => {
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
Mock.mock(/\/product\/del/, req => {
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
Mock.mock(/\/product\/detail/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'id|1-1000': 1,
      'name': '@ctitle',
      'category_id|1-100': 1,
      'ad_img': '@image(\'200x200\')',
      'desc': '@word',
      'intro': '@word',
      'media|1-10': [{
        'media_type': 1,
        'url': '@image(\'200x200\')'
      }],
      'status|1': statusArr,
      'is_return|1': statusArr,
      'sku|9': [{
        'id|1-10': 1,
        'sale_price|1-100': 1,
        'market_price|1-100': 1,
        'cost_price|1-100': 1,
        'stock|1-100': 1,
        'alert_stock|1-100': 1,
        'status|1': statusArr,
        'ad_img': '@image(\'200x200\')',
        'specs|2': [{
          'specs_key_id|1-100': 1,
          'specs_value_id|1-100': 1,
          'specs_key_name': '@ctitle',
          'specs_value_name': '@ctitle'
        }]
      }],
      'specs|2': [
        {
          'specs_key_id|1-10': 1,
          'name': '@ctitle',
          'specs_value|3': [{
            'specs_value_id|1-10': 1,
            'name': '@ctitle'
          }]
        }
      ],
      'create_time': '@datetime'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
