<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="分类名称" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入分类名称"></Input>
    </FormItem>
    <FormItem label="分类排序" prop="sort">
      <Input v-model="formValidate.sort" type="number" placeholder="请输入分类排序" number></Input>
    </FormItem>
    <FormItem label="状态" prop="status">
      <RadioGroup v-model="formValidate.status">
        <Radio label="1">启用</Radio>
        <Radio label="2">禁用</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'CategoryAddEdit',
  props: {
    scene: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      id: null,
      formValidate: {
        name: '',
        sort: '',
        status: '1',
        parent_id: 0
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写分类名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, type: 'number', message: '请填写分类排序', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择分类状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    detail () {
      this.$api.department.detail({ id: this.id }).then(res => {
        console.log('role detail res', res)
        if (res.data.errcode === 200) {
          this.formValidate.name = res.data.data.name
          this.formValidate.sort = Number.parseInt(res.data.data.sort)
          this.formValidate.parent_id = res.data.data.parent_id
          this.formValidate.status = res.data.data.status + ''
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.id == null) {
            this.$api.category.add(this.formValidate).then(res => {
              console.log('add res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('新增成功')
              }
            })
          } else {
            let params = this.formValidate
            params.id = this.id
            this.$api.category.edit(params).then(res => {
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
    this.$nextTick(() => {
      let id = this.$route.query.id
      let parent_id = this.$route.query.parent_id

      if (parent_id) {
        this.formValidate.parent_id = parent_id
      }

      console.log('id', id)
      if (id) {
        this.id = id
        this.detail()
      }
    })
  }
}
</script>

<style scoped>

</style>
