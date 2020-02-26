<template>
<div>
  <div class="search-con search-con-top">
<!--    <Select v-model="searchKey" class="search-col">-->
<!--      <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>-->
<!--    </Select>-->
    <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="params.keyword"/>
    <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
    <Button style="float: right;" :to="{ name: 'product_category_add', query: { parent_id: 0 }}" type="primary">新增一级分类</Button>
  </div>
  <Table row-key="id"  border :columns="columns" :data="data" _showChildren>
    <slot name="header" slot="header"></slot>
    <slot name="footer" slot="footer"></slot>
    <slot name="loading" slot="loading"></slot>
  </Table>
  <Page style="margin-left: 10px; margin-top: 20px;" :total="total_rows" show-elevator show-sizer show-total :page-size-opts="page_size_opts" @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
</div>
</template>

<script>
export default {
  name: 'category_list',
  data () {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1,
        keyword: ''
      },
      page_size_opts: [10, 20, 30, 40],
      total_rows: 0,
      data: [],
      columns: [
        {
          title: '名称',
          key: 'name',
          tree: true
        },
        {
          title: '层级关系',
          key: 'path'
        },
        {
          title: '状态',
          key: 'status_name'
        },
        {
          title: '创建时间',
          key: 'create_time'
        },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            let btns = []

            // btns.push(h('Button', {
            //   props: {
            //     type: 'primary',
            //     size: 'small'
            //   },
            //   style: {
            //     marginRight: '5px'
            //   },
            //   on: {
            //     click: () => {
            //       this.show(params.index)
            //     }
            //   }
            // }, '详情'));

            // 只有第一和第二层级的分类可以新增子分类
            if (params.row.level === 1 || params.row.level === 2) {
              btns.push(h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'product_category_add',
                      query: {
                        'parent_id': params.row.id
                      }
                    })
                  }
                }
              }, '新增子分类'))
            }

            // 新增编辑按钮
            btns.push(h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'product_category_edit',
                    query: {
                      'id': params.row.id
                    }
                  })
                }
              }
            }, '编辑'))

            // 没有下级分类的可以操作删除
            if (params.row.children_count === 0) {
              btns.push(h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    // vm.$emit('on-delete', params)
                    // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                    this.remove(params.index, params.row.id)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ]))
            }

            return h('div', btns)
          }
        }
      ]
    }
  },
  methods: {
    getData () {
      const that = this
      that.$api.category.list(that.params).then(res => {
        console.log('list res', res)
        if (res.data.errcode === 200) {
          that.data = res.data.data
          that.total_rows = res.data.data.length
        }
      })
    },
    handleClear () {
      this.params.keyword = ''
    },
    handleSearch () {
      this.getData()
    },
    onPageChange (value) {
      this.params.pageNumber = value
      this.getData()
    },
    onPageSizeChange (value) {
      this.params.pageSize = value
      this.getData()
    },
    show (index) {
      this.$Modal.info({
        title: '分类信息',
        content: `名称：${this.data[index].name}<br>简介：${this.data[index].intro}<br>状态：${this.data[index].status_name}`
      })
    },
    remove (index, id) {
      this.$api.category.del({ id: id }).then(res => {
        if (res.data.errcode === 200) {
          this.data.splice(index, 1)
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="less">

  .search-con{
    padding: 10px 0;
    .search{
      &-col{
        display: inline-block;
        width: 200px;
      }
      &-input{
        display: inline-block;
        width: 200px;
        margin-left: 2px;
      }
      &-btn{
        margin-left: 2px;
      }
    }
  }

</style>
