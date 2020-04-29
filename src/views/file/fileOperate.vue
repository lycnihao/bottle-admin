<template>
			<a-modal
			:title="nameOperate.isCreate ? '创建文件夹' : '重命名'"
			:visible="nameOperate.visible"
			@ok="handleName"
			:confirmLoading="nameOperate.loading"
			@cancel="nameOperate.visible = false"
			>
				<a-input size="large" placeholder="文件名称" v-if="nameOperate.visible" v-model="nameOperate.value" />
			</a-modal>
</template>

<script>
import fileManager from '@/api/fileManager'

export default {
	name: 'FileOperate',
	props: {
		nameOperate: {
		  type: Object,
		  required: false,
			default: function () {
				return { isCreate: false, visible: false }
			}
		},
		paths: {
		  type: Array,
		  required: false,
			default: function () { return [] }
		}
	},
	data () {
		return {
			
		}
	},
	watch: {
	  'nameOperate.visible': function(newValue, oldValue) {
	    if (newValue) {
				this.$set(this.nameOperate, 'value', this.nameOperate.source)
			}
	  }
	},
	methods: {
		handleName() {
			this.nameOperate.loading = true
			const path = this.paths.join('/') + '/'
			if (this.nameOperate.isCreate) {
				fileManager.createFolder({ 'path': path + this.nameOperate.value }).then(res => {
					console.log(res)
					this.$emit('callback', res)
				}).catch(e => {
					console.log(e.response)
					this.$notification.error({ message: '错误提示', description: e.response.data.message })
				})
			} else {
				fileManager.rename({ 'path': path + this.nameOperate.source, 'newPath': path + this.nameOperate.value }).then(res => {
					console.log(res)
					this.$emit('callback', res)
				}).catch(e => {
					console.log(e.response)
					this.$notification.error({ message: '错误提示', description: e.response.data.message })
				})
			}
			this.nameOperate.loading = this.nameOperate.visible = false
		}
	}
}
</script>

<style>
</style>
