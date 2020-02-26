<template>
<div>
  <div class="search-con search-con-top">
<!--    <Select v-model="searchKey" class="search-col">-->
<!--      <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>-->
<!--    </Select>-->
    <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="params.keyword"/>
    <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
    <Button style="float: right;" :to="{ name: 'special_add' }" type="primary">新增专题提</Button>
  </div>
  <Table border :columns="columns" :data="data">
    <slot name="header" slot="header"></slot>
    <slot name="footer" slot="footer"></slot>
    <slot name="loading" slot="loading"></slot>
  </Table>
  <Page style="margin-left: 10px; margin-top: 20px;" :total="total_rows" show-elevator show-sizer show-total :page-size-opts="page_size_opts" @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
</div>
</template>

<script>
export default {
  name: 'special_list',
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
          title: '标题',
          key: 'title'
        },
        {
          title: '图片',
          key: 'ad_img',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.ad_img,
                  alt: '暂无照片'
                },
                style: {
                  display: 'block',
                  width: '320px',
                  height: '180px',
                  background: '#ccc',
                  margin: "'0 8px 10px 0"
                }
              })
            ])
          }
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
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '详情'),
              h('Button', {
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
                      name: 'special_edit',
                      query: {
                        'id': params.row.id
                      }
                    })
                  }
                }
              }, '编辑'),
              h('Poptip', {
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
              ])
            ])
          }
        }
      ]
    }
  },
  methods: {
    getData () {
      const that = this
      that.$api.special.list(that.params).then(res => {
        console.log('list res', res)
        if (res.data.errcode === 200) {
          that.data = res.data.data.list
          that.total_rows = res.data.data.total_rows
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
        title: '专题信息',
        content: `名称：${this.data[index].title}<br>配图：<img src="${this.data[index].ad_img}" /><br>状态：${this.data[index].status_name}`
      })
    },
    remove (index, id) {
      this.$api.special.del({ id: id }).then(res => {
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
