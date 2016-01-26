# sliceAnimate

sliceAnimate是一个分动画的轮播插件，你只需要在dom元素上指定好动画的值（left、top、bottom、right、opacity）
就可以很轻松的完成动画效果。

使用方法：
引入sliceAnimate.js文件,为html标签添加position属性。

js:
var move = new sliceAnimate();
var n = 0;

move.init(".box") // 初始化时收集轮播容器；

move.into(n);

setInterval(function(){
  var time = move.out() // 退出动画，会自动将元素的位置还原到初始位置，并返回动画所需的时间。
  setTimeout(function(){
    move.into(n) // 进入动画，参数:指定进入的动画下标。
  },time)
},3000)


html:
'<div class="box">
  <img style="position:absolute;top:0;left:0;" m-left="50" m-top="50">
</div>
<div class="box">
  <img style="position:absolute;top:0;left:0;" m-left="50" m-top="50">
</div>
<div class="box">
  <img style="position:absolute;top:0;left:0;" m-left="50" m-top="50">
</div>'


上面的代码演示了一个完整的动画编写流程
支持的行内声明式：
m-left:最后停留的left位置 // 可省略 至少有一项填写，否则不会启动动画
m-top:最后停留的top位置 // 可省略 至少有一项填写，否则不会启动动画
m-right:最后停留的right位置 // 可省略 至少有一项填写，否则不会启动动画
m-bottom:最后停留的bottom位置 // 可省略 至少有一项填写，否则不会启动动画
m-time:动画完成所需的时间// 可省略 默认200毫秒
m-delay:动画延迟播放时间// 可省略，默认0延迟
