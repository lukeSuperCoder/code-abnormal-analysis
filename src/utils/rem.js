// // rem等比适配配置文件
// // 基准大小
// const baseSize = 16;
// // 设置 rem 函数
// function setRem() {
//   // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
//   const scale = document.documentElement.clientWidth / 1920;
//   // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
//   document.documentElement.style.fontSize =
//     baseSize * Math.min(scale, 2) + "px";
// }
// // 初始化
// setRem();
// // 改变窗口大小时重新设置 rem
// window.onresize = function () {
//   setRem();
// };
// rem等比适配配置文件
// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const cslScale = document.documentElement.clientWidth / 1920;
  const scale = cslScale < 0.53 ? 0.53 : cslScale;
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
  //设置页面最小宽高
  // document.body.style.minWidth = "1200px";
  // document.body.style.minHeight = "500px";
  document.body.style.overflow = "auto";
  // if (cslScale < 0.53) {
  //   document.body.style.minWidth = "1200px";
  //   document.body.style.minHeight = "500px";
  //   document.body.style.overflow = "auto";
  // } else {
  //   document.body.style.width = "";
  //   document.body.style.height = "";
  // }
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

