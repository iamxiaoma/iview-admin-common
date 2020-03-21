<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

    <FormItem label="商品名称" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入商品名称"></Input>
    </FormItem>

    <FormItem label="商品封面" prop="ad_img">
      <CommonUpload ref="product_ad_img_upload" :defaultList="ad_img_defaultList" @refreshUploadImg="formValidate.ad_img = $event"></CommonUpload>
    </FormItem>

    <FormItem label="商品图集" prop="media">
      <CommonUpload ref="product_media_upload" :defaultList="media_defaultList" :upload_list_size="10" @refreshUploadList="media = $event"></CommonUpload>
    </FormItem>

    <FormItem label="商品分类" prop="category_id">
      <Select v-model="formValidate.category_id" style="width:200px">
        <Option v-for="item in category_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="商品规格" prop="specs">
      <Card v-for="(spec, index) in specs" :key="index" style="margin-bottom: 20px;">
        <div slot="title">
          <Input  v-model="spec.name" maxlength="10" placeholder="请输入规格名称" style="width: 200px" />
          <Button style="margin-left: 20px;" type="primary" @click.prevent="addSpecsValue(index)">新增规格值</Button>
          <Button style="margin-left: 20px;"  type="error" @click.prevent="delSpecs(index)" v-if="specs.length > 1">删除规格</Button>
        </div>
        <Row :gutter="16" v-if="spec.specs_value.length > 0">
          <Col style="margin-bottom: 10px;" span="4" v-for="(spec_value, idx) in spec.specs_value" :key="idx">
            <Input v-model="spec_value.name" maxlength="10" placeholder="请输入规格值" v-show="spec.specs_value.length === 1" ></Input>
            <Input v-model="spec_value.name" maxlength="10" placeholder="请输入规格值" v-show="spec.specs_value.length > 1" >
              <Button slot="append" icon="ios-trash-outline" @click.prevent="delSpecsValue(index, idx)"></Button>
            </Input>
          </Col>
        </Row>
      </Card>
      <Button style="margin-top: 20px;" @click="addSpecs" icon="ios-add" size="large" type="default">新增规格</Button>
    </FormItem>

    <FormItem label="商品SKU" prop="sku">
      <Table style="margin-top: 20px;" :columns="specs_table_columns" :data="specs_table_data"></Table>
    </FormItem>

    <FormItem label="商品描述" prop="desc">
      <Ueditor ref="product_desc_ueditor" :value="formValidate.desc" @input="formValidate.desc = $event"></Ueditor>
    </FormItem>

    <FormItem label="商品简介" prop="intro">
      <Ueditor ref="product_intro_ueditor" :value="formValidate.intro" @input="formValidate.intro = $event"></Ueditor>
    </FormItem>

    <FormItem label="是否退货" prop="is_return">
      <RadioGroup v-model="formValidate.is_return">
        <Radio label="1">允许</Radio>
        <Radio label="2">不允许</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="状态" prop="status">
      <RadioGroup v-model="formValidate.status">
        <Radio label="1">上架</Radio>
        <Radio label="2">下架</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import CommonUpload from '@/components/common-upload'
import Ueditor from '@/components/ueditor'
export default {
  name: 'ProductAddEdit',
  props: {
    scene: {
      type: String,
      default: 'add'
    }
  },
  components: {
    CommonUpload,
    Ueditor
  },
  data () {
    return {
      id: null,
      category_list: [], // 用于选择的商品分类列表
      ad_img_defaultList: [], // 商品封面默认列表
      media_defaultList: [], // 商品图集默认列表
      media: [], // 商品图集
      sku: [], // 编辑模式下接口返回的 sku 数据，用于填充 sku 表格数据
      specs: [{
        key_id: 0,
        name: '',
        specs_value: [{
          value_id: 0,
          pname: '',
          name: ''
        }]
      }],
      specs2: [{
        key_id: 0,
        name: '',
        specs_value: [{
          value_id: 0,
          pname: '',
          name: ''
        }]
      }, {
        key_id: 0,
        name: '',
        specs_value: [{
          value_id: 0,
          pname: '',
          name: ''
        }]
      }],
      specs3: [{
        name: '颜色',
        specs_value: [{
          pname: '颜色',
          name: '白色'
        }, {
          pname: '颜色',
          name: '红色'
        }]
      }, {
        name: '大小',
        specs_value: [
          {
            pname: '大小',
            name: '小码'
          },
          {
            pname: '大小',
            name: '中码'
          },
          {
            pname: '大小',
            name: '大码'
          }
        ]
      }], // 商品规格列表，用于设置的
      // specs_table_columns: [], // 商品规格表格表头数据
      // specs_table_data: [], // 商品规格表格数据
      formValidate: {
        name: '',
        ad_img: '',
        media: [],
        specs: [],
        sku: [],
        category_id: '',
        intro: '',
        desc: '',
        is_return: '1',
        status: '1'
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        category_id: [
          { required: true, type: 'number', message: '请选择商品分类', trigger: 'change' }
        ],
        ad_img: [
          { required: true, message: '请上传商品封面', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请填写商品简介', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ],
        specs: [
          { required: true, type: 'array', message: '请设置商品规格', trigger: 'change' },
          { type: 'array', min: 1, message: '至少设置一个规格', trigger: 'change' }
        ],
        sku: [
          { required: true, type: 'array', message: '请设置商品SKU', trigger: 'change' },
          { type: 'array', min: 1, message: '至少设置一个SKU', trigger: 'change' }
        ],
        is_return: [
          { required: true, message: '请选择是否退货', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    // 监听商品图集的变化，填充到表单的 media
    media: {
      handler: function (val) {
        const that = this
        console.log('watch media', val)
        that.formValidate.media = []
        val.forEach(function (item, index) {
          that.formValidate.media.push({
            'media_type': 1,
            'url': item
          })
        })
        console.log('that.formValidate.media', that.formValidate.media)
      },
      deep: true,
      immediate: true
    },
    // 监听商品规格 specs 的变化，填充到表单里的 specs
    specs: {
      handler: function (val) {
        const that = this
        console.log('watch specs', val)

        that.formValidate.specs = []

        val.forEach(function (item, index) {
          let specsItem = {}

          specsItem.name = item.name

          let specsValArr = []

          item.specs_value.forEach(function (val, idx) {
            specsValArr.push({
              name: val.name
            })
          })

          specsItem.specs_value = specsValArr

          that.formValidate.specs.push(specsItem)
        })

        console.log('that.formValidate.specs', that.formValidate.specs)
      },
      deep: true,
      immediate: true
    }

    // 监听sku表格数据的变化，填充到表单里的 sku  在 cloumns 里的 on-change 修改之后，竟然没有触发 watch 事件
    // 'specs_table_data': {
    //   handler: (val) => {
    //     console.log('watch specs_table_data', val);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  computed: {
    specs_table_columns: function () {
      console.log('specs_table_columns')
      let columns = []

      if (this.specs.length > 0) {
        this.specs.forEach(function (item, index) {
          console.log('item', item)
          columns.push({
            title: item.name,
            key: 'specs_' + index,
            align: 'center'
          })
        })

        columns.push({
          title: '销售价',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('InputNumber', {
                props: {
                  value: params.row.sale_price
                },
                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['sale_price'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })

        columns.push({
          title: '划线价',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('InputNumber', {
                props: {
                  value: params.row.market_price
                },
                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['market_price'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })

        columns.push({
          title: '成本价',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('InputNumber', {
                props: {
                  value: params.row.cost_price
                },
                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['cost_price'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })

        columns.push({
          title: '库存',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('InputNumber', {
                props: {
                  value: params.row.stock
                },
                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['stock'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })

        columns.push({
          title: '警戒库存',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('InputNumber', {
                props: {
                  value: params.row.alert_stock
                },
                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['alert_stock'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })

        columns.push({
          title: '是否上架',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.status,
                  'true-value': 1,
                  'false-value': 0,
                  size: 'large'
                },

                on: {
                  'on-change': function (val) {
                    console.log('on-change', val)
                    that.specs_table_data[params.index]['status'] = val
                    that.refreshSkuData()
                  }
                }
              }, [
                h('span', { slot: 'open' }, '上架'),
                h('span', { slot: 'close' }, '下架')
              ])
            ])
          }
        })

        columns.push({
          title: '封面图',
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h(CommonUpload, {
                on: {
                  // 实现动态调用组件内部的方法，暂时没法解决 defaultList 没有监听到数据变动的原因
                  refreshTimeout: function (event) {
                    if (params.row.ad_img) {
                      event.onRefreshUploadList([{ url: params.row.ad_img, name: params.row.ad_img }])
                    }
                  },
                  // 上传成功之后触发的方法，在这里赋值修改列表数据
                  refreshUploadImg: function (val) {
                    console.log('upload img', val)
                    that.specs_table_data[params.index]['ad_img'] = val
                    that.refreshSkuData()
                  }
                }
              })
            ])
          }
        })
      }
      return columns
    }, // 商品规格表格表头数据
    specs_table_data: function () {
      const that = this

      console.log('specs_table_data')

      let data = []

      // 获取规格的笛卡尔积数据
      let mapData = this.descartes(this.specs)

      console.log('mapData', mapData)

      mapData.forEach(function (item, index) {
        let specsValue = {}
        let specsArr = []

        if (item.length === undefined) {
          specsValue['specs_' + 0] = item['name']
          specsArr.push(item)
        } else {
          item.forEach(function (value, idx) {
            specsValue['specs_' + idx] = value['name']
            specsArr.push(value)
          })
        }

        // 判断当前的 sku 列表和生成的 sku 列表数量是否一致，一致则可以进行填充
        if (mapData.length === that.sku.length) {
          specsValue['specs'] = specsArr // that.sku[index]['specs'];
          specsValue['sale_price'] = that.sku[index]['sale_price']
          specsValue['market_price'] = that.sku[index]['market_price']
          specsValue['cost_price'] = that.sku[index]['cost_price']
          specsValue['stock'] = that.sku[index]['stock']
          specsValue['alert_stock'] = that.sku[index]['alert_stock']
          specsValue['status'] = that.sku[index]['status']
          specsValue['ad_img'] = that.sku[index]['ad_img']
        } else {
          specsValue['specs'] = specsArr
          specsValue['sale_price'] = 0.0
          specsValue['market_price'] = 0.0
          specsValue['cost_price'] = 0.0
          specsValue['stock'] = 0.0
          specsValue['alert_stock'] = 0.0
          specsValue['status'] = 1
          specsValue['ad_img'] = ''
        }

        data.push(specsValue)
      })

      return data
    } // 商品规格表格数据
  },
  methods: {
    // 手动刷新 sku 数据
    refreshSkuData () {
      const that = this
      console.log('refreshSkuData', that.specs_table_data)

      that.formValidate.sku = []

      that.specs_table_data.forEach(function (item, index) {
        let skuItem = {
          'sale_price': item.sale_price,
          'market_price': item.market_price,
          'cost_price': item.cost_price,
          'stock': item.stock,
          'alert_stock': item.alert_stock,
          'status': item.status,
          'ad_img': item.ad_img
        }

        let specsArr = []

        item.specs.forEach(function (specs, idx) {
          specsArr.push({
            'specs_key_name': specs.pname,
            'specs_value_name': specs.name
          })
        })

        skuItem.specs = specsArr

        that.formValidate.sku.push(skuItem)
      })
    },
    // 计算指定规格列表数据的笛卡尔积数据
    descartes (arr) {
      console.log('descartes arr', arr)

      if (arr.length === 0) {
        return []
      }

      // 编辑原数组格式
      if (arr[0].specs_value) {
        arr = arr.map((item) => {
          return item.specs_value
        })
      }
      if (arr.length === 1) {
        // 最终合并成一个
        return arr[0]
      } else {
        // 有两个子数组就合并
        let arraySon = []
        // 将组合放到新数组中
        arr[0].forEach((item, index) => {
          arr[1].forEach((item1, index1) => {
            arraySon.push([].concat(arr[0][index], arr[1][index1]))
          })
        })
        // 新数组并入原数组,去除合并的前两个数组
        arr[0] = arraySon
        arr.splice(1, 1)
        // 递归
        return this.descartes(arr)
      }
    },
    // 删除指定规格下指定下标的规格值
    delSpecsValue (specsIndex, specsValueIndex) {
      console.log('delSpecsValue specsIndex', specsIndex)
      console.log('delSpecsValue specsValueIndex', specsValueIndex)
      this.specs[specsIndex].specs_value.splice(specsValueIndex, 1)
    },
    // 删除指定下标的规格数据
    delSpecs (index) {
      console.log('delSpecs index', index)
      this.specs.splice(index, 1)
    },
    // 新增指定下标的规格组的规格值
    addSpecsValue (index) {
      console.log('addSpecsValue index', index)
      const that = this

      if (that.specs[index].specs_value.length >= 5) {
        this.$Message.error('每个规格最多允许新增5个规格值')
        return false
      }

      that.specs[index].specs_value.push({
        name: ''
      })

      // 自动聚焦
    },
    // 新增规格组
    addSpecs () {
      console.log('addSpecs')
      const that = this

      if (that.specs.length >= 3) {
        this.$Message.error('最多允许新增3个规格')
        return false
      }

      that.specs.push({
        name: '',
        specs_value: [{
          name: ''
        }]
      })

      // 自动聚焦
      console.log('that.specs', that.specs)
    },
    // 获取分类列表
    getCategoryList () {
      this.$api.category.list({}).then(res => {
        console.log('list res', res)
        if (res.data.errcode === 200) {
          this.category_list = res.data.data
        }
      })
    },
    detail () {
      const that = this
      this.$api.product.detail({ id: this.id }).then(res => {
        console.log('detail res', res)
        if (res.data.errcode === 200) {
          this.formValidate.name = res.data.data.name
          this.formValidate.category_id = res.data.data.category_id
          this.formValidate.ad_img = res.data.data.ad_img
          this.formValidate.intro = res.data.data.intro
          this.formValidate.desc = res.data.data.desc
          this.formValidate.status = res.data.data.status + ''
          this.ad_img_defaultList.push({ url: res.data.data.ad_img, name: res.data.data.ad_img })
          this.sku = res.data.data.sku

          // 重置specs 和 sku 数据源
          that.specs = []
          res.data.data.specs.forEach(function (item, index) {
            console.log('detail specs item', item)

            let specsValueArr = []

            let specsItem = {
              key_id: item.specs_key_id,
              name: item.name,
              specs_value: []
            }

            item.specs_value.forEach(function (specsItem, idx) {
              specsValueArr.push({
                value_id: specsItem.specs_value_id,
                pname: item.name,
                name: specsItem.name
              })
            })

            // 如果接口没有返回规格值数据，则需要补充默认的
            if (specsValueArr.length === 0) {
              specsValueArr.push({
                value_id: 0,
                pname: item.name,
                name: ''
              })
            }

            specsItem.specs_value = specsValueArr

            that.specs.push(specsItem)
          })

          // 如果接口没有返回规格数据，则需要自动补充一个默认的
          if (that.specs.length === 0) {
            that.specs.push({
              key_id: 0,
              name: '',
              specs_value: [{
                value_id: 0,
                pname: '',
                name: ''
              }]
            })
          }

          res.data.data.media.forEach(function (item, index) {
            that.media_defaultList.push({ url: item.url, name: item.url })
          })

          setTimeout(() => {
            this.$refs.product_ad_img_upload.onRefreshUploadList()
            this.$refs.product_media_upload.onRefreshUploadList()
          }, 300)
        }
      })
    },
    handleSubmit (name) {
      console.log('specs_table_data', this.specs_table_data)

      console.log('formValidate', this.formValidate)

      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.id == null) {
            this.$api.product.add(this.formValidate).then(res => {
              console.log('add res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('新增成功')
              }
            })
          } else {
            let params = this.formValidate
            params.id = this.id
            this.$api.product.edit(params).then(res => {
              console.log('edit res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('编辑成功')
              }
            })
          }
        } else {
          this.$Message.error('请根据提示信息填写内容')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      this.getCategoryList()
      let id = this.$route.query.id
      console.log('id', id)
      if (id) {
        this.id = id
        this.detail()
      }

      setTimeout(function () {
        that.refreshSkuData()
      }, 1500)
    })
  }
}
</script>

<style scoped>

</style>
