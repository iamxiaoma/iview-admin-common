<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
    </FormItem>
    <FormItem label="手机号码" prop="mobile">
      <Input v-model="formValidate.mobile" placeholder="请输入手机号码"></Input>
    </FormItem>
    <FormItem label="登录密码" prop="password">
      <Input type="password" v-model="formValidate.password" placeholder="不填表示不更改"></Input>
    </FormItem>
    <FormItem label="确认密码" prop="confirm_password">
      <Input type="password" v-model="formValidate.confirm_password" placeholder="不填表示不更改"></Input>
    </FormItem>
    <FormItem label="部门" prop="department_id">
      <Select v-model="formValidate.department_id" style="width:200px">
        <Option v-for="item in department_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </FormItem>
    <FormItem label="角色" prop="role_id">
      <Select v-model="formValidate.role_id" style="width:200px">
        <Option v-for="item in role_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
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
  name: 'ManagerAddEdit',
  props: {
    scene: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      id: null,
      department_list: [],
      role_list: [],
      formValidate: {
        name: '',
        mobile: '',
        password: '',
        confirm_password: '',
        department_id: '',
        role_id: '',
        status: '1'
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '请填写登录密码', trigger: 'blur' }
        ],
        confirm_password: [
          { required: false, message: '请填写确认密码', trigger: 'blur' }
        ],
        department_id: [
          { required: true, type: 'number', message: '请选择部门', trigger: 'change' }
        ],
        role_id: [
          { required: true, type: 'number', message: '请选择角色', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getDepartmentList () {
      this.$api.department.list({ pageSize: 20, pageNumber: 1 }).then(res => {
        console.log('department list res', res)
        if (res.data.errcode === 200) {
          this.department_list = res.data.data.list
        }
      })
    },
    getRoleList () {
      this.$api.role.list({ pageSize: 20, pageNumber: 1 }).then(res => {
        console.log('role list res', res)
        if (res.data.errcode === 200) {
          this.role_list = res.data.data.list
        }
      })
    },
    detail () {
      this.$api.manager.detail({ id: this.id }).then(res => {
        console.log('role detail res', res)
        if (res.data.errcode === 200) {
          this.formValidate.name = res.data.data.name
          this.formValidate.mobile = res.data.data.mobile
          this.formValidate.department_id = res.data.data.department_id
          this.formValidate.role_id = res.data.data.role_id
          this.formValidate.status = res.data.data.status + ''
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.id == null) {
            this.$api.manager.add(this.formValidate).then(res => {
              console.log('role add res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('新增成功')
              }
            })
          } else {
            let params = this.formValidate
            params.id = this.id
            this.$api.manager.edit(params).then(res => {
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

      this.getDepartmentList()
      this.getRoleList()
    })
  }
}
</script>

<style scoped>

</style>
