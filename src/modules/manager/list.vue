<template>
<div>
  <div class="search-con search-con-top">
<!--    <Select v-model="searchKey" class="search-col">-->
<!--      <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>-->
<!--    </Select>-->
    <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="params.keyword"/>
    <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
    <Button style="float: right;" :to="{ name: 'manager_add' }" type="primary">新增管理员</Button>
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
  name: 'manager_list',
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
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '部门',
          key: 'department_name'
        },
        {
          title: '角色',
          key: 'role_name'
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
                      name: 'manager_edit',
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
      that.$api.manager.list(that.params).then(res => {
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
        title: '管理员信息',
        content: `名称：${this.data[index].name}<br>
                  手机号：${this.data[index].mobile}<br>
                  部门：${this.data[index].department_name}<br>
                  角色：${this.data[index].role_name}<br>
                  状态：${this.data[index].status_name}<br>`
      })
    },
    remove (index, id) {
      this.$api.manager.del({ id: id }).then(res => {
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
