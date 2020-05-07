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
	<template v-slot:action>
		<a-tooltip placement="top">
        <template slot="title">
          <span>http://www.bottle.run</span>
        </template>
         <a href="javascript:;">复制</a>
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
    title: 'Action',
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
  created() {
	shares.listAll().then(res => {
		this.data = res
	})
  }
}
</script>

<style>
</style>
