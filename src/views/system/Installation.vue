<template>
  <div>
    <a-row
      type="flex"
      justify="center"
      align="middle"
      style="height: 100vh;"
    >
      <a-col
        :xl="8"
        :md="12"
        :sm="20"
        :xs="24"
      >
        <div class="card-container">
          <a-card
            :bordered="false"
            title="Bottle 安装向导"
            style="box-shadow: 0px 10px 20px 0px rgba(236, 236, 236, 0.86);"
          >

            <a-steps :current="stepCurrent">
              <a-step title="用户信息">
              </a-step>
              <a-step title="系统信息">
              </a-step>
              <a-step title="安装完成">
              </a-step>
            </a-steps>
            <a-divider dashed />
			
			<!-- 用户的信息 -->
            <a-form
              layout="horizontal"
              v-show="stepCurrent == 0"
              :form="bottleForm"
            >
              <a-form-item class="animated fadeInUp">
                <a-input
					v-model="installation.username"
                  placeholder="用户名"
                  v-decorator="[
                    'username',
                    {rules: [{ required: true, message: '请输入用户名' }]}
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.1s'}"
              >
                <a-input
				  v-model="installation.nickname"
                  placeholder="用户昵称"
                >
                  <a-icon
                    slot="prefix"
                    type="smile"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.2s'}"
              >
                <a-input
				  v-model="installation.email"
                  placeholder="用户邮箱"
                  v-decorator="[
                    'email',
                    {rules: [{ required: true, message: '请输入邮箱' },{ type: 'email',message: '邮箱格式不正确!' }]}
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.3s'}"
              >
                <a-input
				  v-model="installation.password"
                  type="password"
                  placeholder="用户密码（8-100位）"
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: '请输入密码（8-100位）' },{ validator: handleValidatePassword }]}
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.4s'}"
              >
                <a-input
				  v-model="installation.confirmPassword"
                  type="password"
                  placeholder="确认密码"
                  v-decorator="[
                    'confirmPassword',
                    {rules: [{ required: true, message: '请输入确认密码' },{ validator: handleValidateConfirmPassword }]}
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-form>

            <!-- 系统设置 -->

            <a-form
              layout="horizontal"
              v-show="stepCurrent == 1"
            >
              <a-form-item class="animated fadeInUp">
                <a-input
                  v-model="installation.url"
                  placeholder="网站地址"
                >
                  <a-icon
                    slot="prefix"
                    type="link"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.2s'}"
              >
                <a-input
                  v-model="installation.title"
                  placeholder="网站标题"
                >
                  <a-icon
                    slot="prefix"
                    type="book"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-form>

            <a-row
              class="install-action"
              type="flex"
              justify="space-between"
              style="margin-top: 1rem;"
            >
              <div>
                <a-button
                  class="previus-button"
                  v-if="stepCurrent != 0"
                  @click="stepCurrent--"
                  style="margin-right: 1rem;"
                >上一步</a-button>
                <a-button
                  type="primary"
                  v-if="stepCurrent != 1"
                  @click="handleNextStep"
                >下一步</a-button>
              </div>
              <a-button
                v-if="stepCurrent == 1"
                type="primary"
                icon="upload"
                @click="handleInstall"
                :loading="installing"
              >安装</a-button>
            </a-row>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import adminApi from '@/api/admin'

export default {
  data() {
    return {
      installation: {},
      stepCurrent: 0,
      bottleForm: this.$form.createForm(this),
      installing: false
    }
  },
  created() {
    this.verifyIsInstall()
    this.$set(this.installation, 'url', window.location.protocol + '//' + window.location.host)
  },
  methods: {
    handleValidateConfirmPassword(rule, value, callback) {
	  const form = this.bottleForm
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('确认密码和密码不匹配')
      }
      callback()
    },
    handleValidatePassword(rule, value, callback) {
      if (value && value.length < 8) {
        callback('密码不能低于 8 位')
      }
      callback()
    },
    verifyIsInstall() {
      adminApi.isInstalled().then(response => {
        if (response) {
          this.$router.push({ name: 'Login' })
        }
      })
    },
    handleNextStep(e) {
      e.preventDefault()
      this.bottleForm.validateFields((error, values) => {
		console.log('error', error)
		console.log('Received values of form: ', values)
        if (error != null) {
        } else {
          this.stepCurrent++
        }
      })
    },
    install() {
      adminApi
        .install(this.installation)
        .then(response => {
		  console.log('Installation response', response)
          this.$message.success('安装成功！')
          setTimeout(() => {
            this.$router.push({ name: 'Login' })
          }, 300)
        })
        .finally(() => {
          this.installing = false
        })
    },
    handleInstall() {
      const password = this.installation.password
      const confirmPassword = this.installation.confirmPassword

	  console.log('password', password)
	  console.log('Confirm password', confirmPassword)

      if (password !== confirmPassword) {
        this.$message.error('确认密码和密码不匹配')
        return
      }
      this.installing = true
	  this.install()
    }
  }
}
</script>
