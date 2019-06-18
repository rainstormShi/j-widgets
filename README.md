# j-widgets
方便自己写表单项目的小模板(与其说是模板，倒不如说是自己表单页面常用的方法集合，解决ios点击输入框页面顶上去下不来,表单验证，toast弹框，loading，alert弹出层等);
代码问题多多，一般表单项目够用,jui.js中有关于表单验证(需要在在页面中填写特殊元素)，toast弹框，loading，alert弹出层等。方法initInput()可以解决ios 点击输入框时，页面下不来的情况;em...
# 表单验证
首先页面中将需要验证的input/texteare/select/加入俩个元素 
1、j-type:'为不和input自带的type冲突.. 同时在验证的时候是通过j-type来判断类型的，目前支持text&textarea(文本，判空)/mail（邮箱）/phone（手机号）/identity（身份证,身份证验证开了生日验证/城市验证/长度验证，如需跟精准的验证，可通过在jui.js中取消isIdentityCard内注释的代码'
2、jui-required='required' 必填项需加入此属性，同时。满足1&2可进行验证。
初始化 j.putreQuired() 之后便可在自己的Js中通过 j.verifyData() 等于true进行处理判断 不为true 时返回的是message message内容通过一般有placeholder返回placeholder没有的话返回的是“请将信息填写完整”或其他特殊验证</br>
<input j-type='mail' jui-required='required'>
j.putreQuired()
if(j.verifyData == true){
  console.log('填写完毕')
}else{
  console.log(j.verifyData)//请将信息填写完整||邮箱格式不正确
}
# 常用toast
首先需要将<div id='toast-panel'></div>放入需要弹出的box里 如：<div class='index-page'><div id='toast-panel'></div></div>
初始化 j.juiToast(content,type,speed) content:'弹出文字' type:'success||warning||error' 相信用户不想看见x符号，这里我将error换成了与warning一样的感叹号，如需要使用者可自行更换 speed:'显示时间，默认1500'</br>
j.juiToast(提交成功,success,1000)
# 常用laoding
直接调用 j.juiLoading(title,type)使用。title:'loading提示文字' type:1(目前就一种[笑哭])</br>
j.juiLoading('正在加载',1)
# 常用alert
经过相对美化的alert...个人而言 
初始化 j.juiPopup(title,content,btnText,cellback,isClear)
一般用法：<br>
j.juiPopup('标题','内容','按钮文字')，点击按钮弹框消失
特殊用法：
title：'提示卡标题'
content:'提示卡内容，可放入拼接式html。如:“<div>这里显示内容</div>/<div>内容2</div>”'
btnText:'主要按钮文字，默认为“我知道了”'
cellback:'需要执行方法添加传入方法名用引号包裹。
isClear:'是否需要取消按钮,一般用此参数，也用用到cellback这个参数执行方法 建议一块用，点击取消按钮弹框消失，点击另一个按钮执行传入的方法'</br>
如：j.juiPopup('标题','内容','好的','backIndex()',true)'
