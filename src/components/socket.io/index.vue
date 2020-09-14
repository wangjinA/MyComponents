<template>
  <div class="socket-io">
    <div class="socket-io-content" v-if="beUser">
      <div v-for="item in list" :key="item.chatId" class="chat-item">
        <div>{{ item.userInfo.userName }}</div>
        ：
        <div>{{ item.content }}</div>
      </div>
      <div class="input-wrap">
        <textarea @keyup.enter="sendChat" v-model="text"></textarea>
      </div>
    </div>
    <div class="onlines">
      <div class="online-title">在线成员</div>
      <div
        v-for="(user, index) in online"
        :key="user.userId"
        class="hover"
        @click="onlineClick(user)"
      >
        {{ index + 1 }} {{ user.userName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "socket",
  data() {
    return {
      list: [],
      online: [],
      text: "",
      beUser: "",
    };
  },
  methods: {
    getOnline() {
      this.$get("/api/socketOnline").then((res) => {
        this.online = res.data;
        this.$root.socket.on("newEnter", (data) => {
          this.online.push(data);
        });
        this.$root.socket.on("leave", (data) => {
          console.log(data);
          let userId = data.userId;
          let index = this.online.findIndex((user) => user.userId == userId);
          if (index != -1) {
            this.online.splice(index, 1);
          }
        });
      });
    },
    onlineClick(user) {
      if (user.userId === this.userInfo.userId) {
        this.$Message.warning({
          content: "不能给自己发消息，点击其他人试试",
          background: true,
          duration: 2,
        });
      } else {
        this.beUser = user;
      }
    },
    sendChat() {
      this.$root.socket.emit(
        "sendChatByUser",
        {
          beUserId: this.beUser.userId,
          content: this.text,
          userId: this.userInfo.userId,
        },
        (res) => {
          console.log(res);
          console.log("发送成功");
        }
      );
    },
  },
  created() {
    this.getOnline();
    this.$root.socket.emit("join", this.userInfo.userId);
    this.$root.socket.on("sendChatByUser", (data) => {
      console.log(data);
      this.list.push(data);
    });
  },
  destroyed() {
    this.$root.socket.off("sendChatByUser");
    this.$root.socket.off("newEnter");
  },
};
</script>

<style lang="less" scoped>
.socket-io {
  height: 100%;
  .flex-center();
  .onlines {
    margin-left: 20px;
    &-title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .socket-io-content {
    width: 50vw;
    min-width: 1000px;
    height: 60vh;
    min-height: 600px;
    border: 1px solid chartreuse;
    padding: 2vw;
    position: relative;
    .chat-item {
      display: flex;
    }
    .input-wrap {
      left: 0;
      right: 0;
      position: absolute;
      bottom: 0;
      height: 130px;
      border-top: 1px solid coral;
      display: flex;
      textarea {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        padding: 1vw;
        resize: none;
      }
    }
  }
}
</style>
