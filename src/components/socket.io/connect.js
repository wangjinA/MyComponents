import io from "socket.io-client";
let socket = io("http://localhost:3000", {
  path: '/socket',
  reconnectionAttempts: 2, // 最大重连数
  test: 666
});
console.log(socket);
socket.on("connect", (res) => {
  console.log("scoket.io 连接成功！");
});
socket.on("connect_error", (error) => {
  console.log("scoket.io 连接失败！" + error);
});
socket.on("disconnect", (timeout) => {
  console.log("scoket.io 连接丢失 | 断开！" + timeout);
});
socket.on("reconnecting", (timeout) => {
  console.log("scoket.io 尝试重新连接次数：" + timeout);
});
export default socket