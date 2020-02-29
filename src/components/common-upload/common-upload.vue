<template>
  <div>
    <div class="common-upload-list" v-for="(item, index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="common-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :name="file_name"
      :show-upload-list="false"
      :default-file-list="defaultListData"
      :on-success="handleSuccess"
      :accept="accept"
      :format="format"
      :max-size="max_size"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :multiple="multiple"
      :type="type"
      :action="action"
      :headers="headers"
      :data="upload_data"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'
import './index.less'
export default {
  name: 'CommonUpload',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    upload_list_size: {
      type: Number,
      default: 1
    },
    file_name: {
      type: String,
      default: 'file'
    },
    format: {
      type: Array,
      default: function () {
        return ['jpg', 'jpeg', 'png']
      }
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png'
    },
    max_size: {
      type: Number,
      default: 2048
    },
    action: {
      type: String,
      default: axios.baseUrl + 'upload/single'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'drag'
    },
    defaultList: {
      type: Array,
      default: function () {
        return []
      }
    },
    headers: {
      type: Object,
      default: function () {
        return { token: getToken() }
      }
    },
    upload_data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // defaultList: [
      //   {
      //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
      //     'url': 'https://dev-file.iviewui.com/8OpfW5PeqNRsMaanoB9WykGYrfjRUL5e/large'
      //   },
      //   {
      //     'name': 'bc7521e033abdd1e92222d733590f104',
      //     'url': 'https://dev-file.iviewui.com/8OpfW5PeqNRsMaanoB9WykGYrfjRUL5e/large'
      //   }
      // ],
      imgUrl: '',
      visible: false,
      uploadList: []
    }
  },
  computed: {
    defaultListData: {
      get () {
        return this.defaultList
      },
      set (newValue) {
        return newValue
      }
    }
  },
  methods: {
    // 往组件外传递上传的文件url
    refreshUploadResult () {
      console.log('uploadList', this.uploadList)
      let uploadImgList = []
      this.uploadList.forEach(function (item, index) {
        uploadImgList.push(item.url)
      })
      if (this.upload_list_size > 1) {
        // 获取图片列表，则返回列表
        this.$emit('refreshUploadList', uploadImgList)
      } else {
        // 只获取一个，则直接返回图片链接
        this.$emit('refreshUploadImg', uploadImgList.length > 0 ? uploadImgList[0] : '')
      }
    },
    handleView (url) {
      console.log('handleView url', url)
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.refreshUploadResult()
    },
    handleSuccess (res, file) {
      console.log('upload handleSuccess res', res)
      console.log('upload handleSuccess file', file)
      if (res.errcode === 200) {
        // this.$refs.upload.fileList.push({ url: res.data.url, status: 'finished' });
        file.url = res.data.url
        file.name = res.data.url
        this.refreshUploadResult()
      } else {
        this.$Notice.warning({
          title: '文件上传失败',
          desc: res.errmsg
        })
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '上传的文件格式不支持',
        desc: '文件 ' + file.name + ' 的格式不正确，请选择 ' + this.format + ' 格式的文件'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '上传的文件大小超过限制',
        desc: '文件  ' + file.name + ' 的大小超过限制，最大为' + this.max_size + ' KB'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.upload_list_size
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传' + this.upload_list_size + '张图片'
        })
      }
      return check
    },
    // 动态刷新已经上传的图片列表数据
    onRefreshUploadList (defaultList) {
      const that = this
      that.uploadList = that.$refs.upload.fileList
      if (defaultList) {
        defaultList.forEach(function (item) {
          that.uploadList.push({
            url: item.url,
            name: item.name,
            status: 'finished',
            percentage: 100,
            uid: Date.parse(new Date())
          })
        })
      }
    }
  },
  mounted () {
    const that = this
    // 立即调用外部的方法，再从外部的方法里，调用实例内部的方法
    that.$emit('refreshTimeout', that)
    that.$nextTick(() => {
      that.uploadList = that.$refs.upload.fileList
    })
  }
}
</script>
