<template>
	<a-card :bordered="false">
    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
        取消分享
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `已选中 ${selectedRowKeys.length} 个文件/文件夹` }}
        </template>
      </span>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
    >
	<template slot="action" slot-scope="text, record">
		<a-tooltip placement="top">
        <template slot="title">
          <span v-html="'http://bottle.run/s/' + record.fileKey"></span>
        </template>
         <a href="javascript:;" @click="copy($event)">复制
		 <span class="copy-bar" v-html="'http://bottle.run/s/' + record.fileKey"></span>
		 </a>
		</a-tooltip>
	</template>
	</a-table>
  </a-card>
</template>

<script>
import shares from '@/api/shares'

const columns = [
  {
    title: '分享文件',
    dataIndex: 'title'
  },
  {
    title: '分享时间',
    dataIndex: 'createTime'
  },
  {
    title: '失效时间',
    dataIndex: 'expiredTime'
  },
   {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
	copy(event) {
		// 创建range对象
		var range = document.createRange()
		// 传入需要选中的节点
		range.selectNodeContents(event.target.querySelector('span'))
		var selection = document.getSelection()
		// 清空选中的区域
		selection.removeAllRanges()
		// 添加选中区域
		selection.addRange(range)
		document.execCommand('Copy')
		this.$message.success('分享链接已复制')
	},
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  },
  mounted() {
	shares.listAll().then(res => {
		this.data = res
	})
  }
}
</script>

<style>
	.copy-bar {
		z-index: -1;
		position: absolute;
	}
</style>
