<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @login="handleSubmit" @register="handleRegister"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LoginForm from "@/components/login-form";
import { sessionJoinVue } from "@/utils";
export default {
  name: "login",
  components: {
    LoginForm,
  },
  methods: {
    handleRegister({ userName, password }) {
      this.$post(
        "/api/register",
        {
          userName,
          password,
        },
        true
      ).then((res) => {
        console.log(res);
        if (res.data.status) {
          // this.$router.push("/myC");
        }
      });
    },
    handleSubmit({ userName, password }) {
      this.$post(
        "/api/login",
        {
          userName,
          password,
        },
        true
      )
        .then((res) => {
          console.log(res);
          if (res.status) {
            localStorage.setItem("token", res.data.token);
            this.sessionJoinVue("userInfo", res.data.userInfo);
            this.$router.push("/myC");
          }
        })
        .catch(() => {
          this.$Message.error({
            background: true,
            content: "登录失败",
            duration: 2,
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
