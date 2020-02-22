<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="部门名称" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入部门名称"></Input>
    </FormItem>
    <FormItem label="部门简介" prop="intro">
      <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入部门简介"></Input>
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
  name: 'DepartmentAddEdit',
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
        intro: '',
        status: '1'
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写部门名称', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请填写部门简介', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择部门状态', trigger: 'change' }
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
          this.formValidate.intro = res.data.data.intro
          this.formValidate.status = res.data.data.status + ''
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.id == null) {
            this.$api.department.add(this.formValidate).then(res => {
              console.log('role add res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('新增成功')
              }
            })
          } else {
            let params = this.formValidate
            params.id = this.id
            this.$api.department.edit(params).then(res => {
              console.log('role edit res', res)
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
