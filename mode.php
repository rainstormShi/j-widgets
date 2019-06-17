<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="renderer" content="webkit">
  <meta name="HandheldFriendly" content="true">
  <meta http-equiv="Cache-Control" content="no-siteapp">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="format-detection" content="telephone=no, email=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="msapplication-tap-highlight" content="no">
  <link rel="stylesheet" type="text/css" href="assets/jui.css">
  <title></title>
  <style>
    html,body{
      position: relative;
      width:100%;
      height:100%;
      max-width:640px;
      min-width:300px;
      padding:0;
      margin:0;
    }
    .maxAndMin{
      max-width:640px;
      min-width:300px;
    }
    .index-page{
      position: relative;
      width:100%;
      height:100%;
      overflow: hidden;
    }
    .index-bg{
      position: absolute;
      width:100%;
      top:0;
      left:0;
      right:0;
      margin:0 auto;
      background-color:#ffd699;
      filter:blur(2px);
    }
    .jui-btn{
      text-align: center;
    }
    .left-btn{
      background-color:#1E9FFF;
    }
    .right-btn{
      background-color:#53c980;
      margin-right:3%;
    }
    .jui-btn-box{
      position: absolute;
      left:0;
      right:0;
      margin:0 auto;
      bottom:5vw;
    }
  </style>
</head>
<body>
  <div id='toast-panel'></div>
  <div class='index-page'>
    <img src="assets/images/bg.png" class='index-bg'>
    <form class='jui-form' id='form-1'>
      <div class='j-form-item'>
        <label class='jui-label col-3'>姓名:</label>
        <div class='jui-input-box col-8'>
          <input type="text" j-type='text' name="username" placeholder="请输入姓名" class='jui-input' jui-required='required'>
        </div>
      </div>
      <div class='j-form-item'>
        <label class='jui-label col-3'>手机号码</label>
        <div class='jui-input-box col-8'>
          <input type="tel" j-type='phone' name="userTel" placeholder="请输入手机号码" class='jui-input' jui-required='required'>
        </div>
      </div>
      <div class='j-form-item'>
        <label class='jui-label col-3'>身份证号</label>
        <div class='jui-input-box col-8'>
          <input type="text" j-type='identity' name="userIdentityNo" class='jui-input' jui-required='required' placeholder="请输入身份证号">
        </div>
      </div>
      <div class='j-form-item'>
        <label class='jui-label col-3'>邮箱</label>
        <div class='jui-input-box col-8'>
          <input type="text" j-type='mail' name="e-mail" class='jui-input' jui-required='required' placeholder="请输入邮箱">
        </div>
      </div>
      <div class='j-form-item'>
        <label class='jui-label col-3'>学历</label>
        <div class='jui-input-box col-8'>
          <select j-type='select' name='userDegree' jui-required='required'>
            <option value='-1'>请选择学历</option>
            <option value='0'>小学</option>
          </select>
        </div>
      </div>
    </form>
    <div class='jui-btn-box'>
      <div class='jui-btn left-btn f-left' onclick="_.save()">保存</div>
      <div class='jui-btn right-btn f-right' onclick="_.submit()">提交</div>
    </div>
  </div>
  <script type="text/javascript" src='assets/jquery-3.4.1.min.js'></script>
  <script type="text/javascript" src='assets/jui.js'></script>
  <script type="text/javascript">
    (function (document){
      var _overwrite = window._,
      _;
      _ = {
          save:function(){
            j.juiLoading('正在保存',1)
            setTimeout(function(){
              j.juiPopup('温馨提示','保存成功')
            },1000)
          }
          ,submit:function(){
            var verifyDataMessage = j.verifyData()
            if(verifyDataMessage != true){
              j.juiToast(verifyDataMessage,'warning')
            }else{
              j.juiLoading('正在提交',1)
              setTimeout(function(){
                j.juiToast('提交成功','success',1500)
              },1000)
              $('.f-right').attr('onclick',"j.juiPopup('温馨提示','您已提交过信息，请勿重新提交','重置','_.reset()',true)")
            }
          }
          ,reset:function(){
            $('#jui-popup').remove()
            $('input').val('')
            $('select').val('-1')
            $('.f-right').attr('onclick','_.submit()')
          }
      }
      window._ = _;
    })(document);
    window.onload = function(){
      j.putreQuired()
    }
  </script>
</body>
</html>
