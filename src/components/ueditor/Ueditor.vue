<template>
  <div>
    <vue-ueditor-wrap @ready="editorReady" v-model="content" :config="editorConfig"></vue-ueditor-wrap>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
import { getToken } from '@/libs/util'
import axios from '@/libs/api.request'

export default {
  name: 'Ueditor',
  components: {
    VueUeditorWrap
  },
  props: {
    /* 编辑器的内容 */
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请输入文本内容'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    /* 图片大小 */
    maxSize: {
      type: Number,
      default: 4000 // kb
    },
    serverUrl: {
      type: String,
      default: axios.baseUrl + 'upload/ueditor'
    }
  },
  data () {
    return {
      editor: null,
      content: this.value,
      editorConfig: {
        // wordCount
        wordCount: false, // 是否开启字数统计
        maximumWords: 65535, // 允许的最大字符数
        // 设置远程图片是否抓取到本地保存
        catchRemoteImageEnable: false, // 设置是否抓取远程图片
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 440,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: this.serverUrl,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/Ueditor/',
        headers: {
          'Token': getToken()
        },
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'map', 'insertframe', 'pagebreak', 'template', 'background', '|',
          'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'print', 'preview', 'searchreplace', 'drafts', 'help'
        ]]
      }
    }
  },
  created () {
    console.log('ueditor created content', this.content)
    console.log('ueditor created value', this.value)
  },
  watch: {
    content: function (value) {
      console.log('watch content', value)
      this.$emit('input', value == null ? '' : value)
    },
    value: function (value) {
      console.log('watch value', value)
      this.content = value == null ? '' : value
    }
  },
  mounted () {
    let that = this
    console.log('ueditor mounted')
    this.$nextTick(function () {
      console.log('ueditor nextTick')
      console.log('content', that.content)
      console.log('value', that.value)
    })
  },
  methods: {
    editorReady (editorInstance) {
      const that = this
      that.editorInstance = editorInstance
      console.log(`编辑器实例${editorInstance.key}`, editorInstance)
      // that.editorInstance.execCommand('serverparam', {
      //   'obj_id': that.pobj_id,
      //   'obj_type': that.pobj_type,
      //   'seq_id': that.pseq_id
      // });
    },
    // 刷新编辑器的额外参数数据
    updateServerParam (params) {
      console.log('updateServerParam', params)
      // this.pobj_id = params.obj_id;
      // this.pobj_type = params.obj_type;
      // this.pseq_id = params.seq_id;
      if (this.editorInstance) {
        console.log('updateServerParam editorInstance')
        this.editorInstance.execCommand('serverparam') // 先清除参数表，再赋值，才能更新参数表
        this.editorInstance.execCommand('serverparam', params)
      }
    }
  }
}
</script>

<style scoped>
  .edui-button.edui-for-135editor .edui-button-wrap .edui-button-body .edui-icon{

    background-image: url("http://static.135editor.com/img/icons/editor-135-icon.png") !important;

    background-size: 85%;

    background-position: center;

    background-repeat: no-repeat;

  }
</style>
