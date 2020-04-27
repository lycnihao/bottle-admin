<template>
  <div id="uploader">
    <uploader :options="options">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
		<a-button-group>
			<a-button type="primary">
				<uploader-btn>选择文件</uploader-btn>
			</a-button>
			<a-button type="primary">
				<uploader-btn :directory="true">选择文件夹</uploader-btn>
			</a-button>
		</a-button-group>
      
    </uploader-drop>
    <uploader-list>
		<ul class="file-list" slot-scope="props">
			<li v-for="file in props.fileList" :key="file.id">
				<uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
			</li>
			<div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
		</ul>
	</uploader-list>
  </uploader>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    name: {
      type: String,
      required: false,
      default: 'file'
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    draggable: {
      type: Boolean,
      required: false,
      default: true
    },
    accept: {
      type: String,
      required: false,
      default: ''
    },
	directory: {
	  type: Boolean,
	  required: false,
	  default: true
	},
	attachOption: {
	  type: Object,
	  required: false,
	  default: function () {
        return { path: 'root/' }
      }
	},
    uploadHandler: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleChange(info) {
      this.$emit('change', info)
    },
    handleRemove(file) {
      this.$emit('remove', file)
    },
    handleUpload(option) {
      console.log('上传')
	  this.$emit('openUploader', {
	      id: '1111'
	  })
    }
  }
}
</script>

<style lang="scss" scoped>
	
	#uploader .uploader-drop {
		padding: 0;
		top: -15px;
		border: none;
		background-color: #fff;
	}
	
	#uploader .uploader-drop .ant-btn{
		padding: 0
	}
	#uploader .uploader-btn {
		padding: 6px 14px;
		color: #fff;
		border: none;
	}
	#uploader .uploader-btn:hover {
		background-color: transparent;
	}
	
	#uploader {
	    /deep/.uploader-file-icon {
	        &:before {
	            content: '' !important;
	        }
	    
	        &[icon=image] {
	            background: url(./images/image-icon.png);
	        }
	        &[icon=video] {
	            background: url(./images/video-icon.png);
	        }
	        &[icon=document] {
	            background: url(./images/text-icon.png);
	        }
	    }
	}
</style>
