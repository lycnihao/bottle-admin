<template>
	<a-layout id="share-v">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <!-- <a-menu-item key="1">
          nav 1
        </a-menu-item> -->
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
	  <div class="main">
		  <div class="player" v-show="videoPreviewVisible">
			  <d-player
			    ref="player"
			    :options="videoOptions"
			    v-show="videoPreviewVisible"
			    style="width: 100%;"
			  >
			  </d-player>
		  </div>
	  </div>
      <!-- <div class="info">
		  <h1>周星驰电影</h1>
        <div> {{ $route.params.key }}</div>
      </div> -->
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import shares from '@/api/shares'
import 'vue-dplayer/dist/vue-dplayer.css'
import VueDPlayer from 'vue-dplayer'
/* import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs' */
export default {
  name: 'ShareView',
	components: {
		'd-player': VueDPlayer
	},
	data () {
		return {
			attachment: {},
			videoPreviewVisible: false,
			videoOptions: {
			  lang: 'zh-cn',
			  video: {
			    url: '',
			    type: 'auto'
			  }
			}
		}
	},
	mounted ()	{
		shares.query(this.$route.params.key).then(res => {
			this.videoPreviewVisible = true
			this.attachment.title = res.data.title
			this.$refs.player.dp.switchVideo({
				url: encodeURI('http://localhost:8080/api/admin/shares/s/' + res.data.fileKey)
			})
		})
	}
}
</script>

<style >
	#share-v .logo {
	  width: 120px;
	  height: 31px;
	  background: rgba(255, 255, 255, 0.2);
	  margin: 16px 24px 16px 0;
	  float: left;
	}
	#share-v .header {
		position: absolute;
		zIndex: 1;
		width: 100%;
	}
	
	#share-v .content {
		margin-top: 64px;
	}
	
	#share-v .content .main {
		width: 100%;
		height: 520px;
		padding-top: 20px;
		background: #000;
		position: relative;
		z-index: 2;
	}
	
	#share-v .content .info {
		padding: 32px 250px 12px;
		background: #fff;
		min-height: 380px;
	}
</style>
