<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <i-input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
      <Button class="register-btn" @click="handleReister" type="info" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      },
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      },
    },
  },
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
      };
    },
  },
  methods: {
    handleReister() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit("register", {
            userName: this.form.userName,
            password: this.form.password,
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit("login", {
            userName: this.form.userName,
            password: this.form.password,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-btn {
  margin-top: 15px;
}
</style>
