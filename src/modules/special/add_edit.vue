<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="专题标题" prop="title">
      <Input v-model="formValidate.title" placeholder="请输入专题标题"></Input>
    </FormItem>
    <FormItem label="专题封面" prop="ad_img">
      <CommonUpload ref="upload" :defaultList="defaultList" @refreshUploadImg="formValidate.ad_img = $event"></CommonUpload>
    </FormItem>
    <FormItem label="专题内容" prop="desc">
      <Ueditor ref="ueditor" :value="formValidate.desc" @input="formValidate.desc = $event"></Ueditor>
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
import CommonUpload from '@/components/common-upload'
import Ueditor from '@/components/ueditor'
export default {
  name: 'SpecialAddEdit',
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
      defaultList: [],
      formValidate: {
        title: '',
        ad_img: '',
        desc: '',
        status: '1'
      },
      ruleValidate: {
        title: [
          { required: true, message: '请填写专题标题', trigger: 'blur' }
        ],
        ad_img: [
          { required: true, message: '请上传专题封面', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写专题内容', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    detail () {
      this.$api.special.detail({ id: this.id }).then(res => {
        console.log('special detail res', res)
        if (res.data.errcode === 200) {
          this.formValidate.title = res.data.data.title
          this.formValidate.ad_img = res.data.data.ad_img
          this.formValidate.desc = res.data.data.desc
          this.formValidate.status = res.data.data.status + ''
          this.defaultList.push({ url: res.data.data.ad_img, name: res.data.data.ad_img })
          setTimeout(() => {
            this.$refs.upload.onRefreshUploadList()
          }, 300)
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.id == null) {
            this.$api.special.add(this.formValidate).then(res => {
              console.log('add res', res)
              if (res.data.errcode === 200) {
                this.$Message.success('新增成功')
              }
            })
          } else {
            let params = this.formValidate
            params.id = this.id
            this.$api.special.edit(params).then(res => {
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
