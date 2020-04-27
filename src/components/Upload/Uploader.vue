<template>
  <div id="uploader">
    <uploader 
				ref="uploader"
				:options="options"
				:file-status-text="statusText"
				@file-complete="handleFileComplete" 
				@complete="handleComplete"
		>
			<uploader-unsupport></uploader-unsupport>
			<uploader-drop>
			<a-button-group>
				<div class="ant-upload ant-upload-btn">
					
				</div>
				<span>
					<div class="ant-upload ant-upload-drag">
							<uploader-btn :directory="directory" class="ant-upload-drag-container">点击选择文件或文件夹</uploader-btn>
					</div>
				</span>
				</a-upload-dragger>
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
import fileManager from '@/api/fileManager'
	
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
	data() {
	  return {
	    options: {
	      target: fileManager.fileChunk(),
	      testChunks: true,
	      simultaneousUploads: 1,
	      chunkSize: 10 * 1024 * 1024
	    },
	    attrs: {
	      accept: 'image/*'
	    },
	    statusText: {
	      success: '上传成功',
	      error: '出错了',
	      uploading: '上传中',
	      paused: '暂停中',
	      waiting: '等待中'
	    }
	  }
	},
  methods: {
    handleChange(info) {
      this.$emit('change', info)
    },
    handleComplete() {
      console.log('complete', arguments)
    },
    //	一个根文件（文件夹）成功上传完成。
    handleFileComplete() {
      console.log('file complete', arguments)
      const file = arguments[0].file
			fileManager.mergeFile(Object.assign({
        filename: file.name,
        identifier: arguments[0].uniqueIdentifier,
        totalSize: file.size,
        type: file.type
      })).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	
	#uploader {
			.ant-btn-group {
				width: 100%;
				margin-top: 8px;
				text-align: center;
			}
			
			.uploader-drop {
				padding: 0;
				top: -15px;
				border: none;
				background-color: #fff;
			}
			
			.uploader-drop .ant-btn{
				padding: 0
			}
			
			.uploader-btn {
				display: block;
				padding: 14px 0;
				color: rgba(0,0,0,.85);
				border: none;
			}
			
			.uploader-btn:hover {
				background-color: transparent;
			}
			
			.no-file {
				text-align: center;
				color: rgba(0,0,0,.45);
			}
			
			.uploader-file {
				border-bottom: none
			}
		
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
