//获取form表单name
(function (document){
  var requiredArray = []
  var jCountdown = 60;
  var _overwrite = window._,
      _;
  _ = {
    // ....先放着
    JDom:function(id){
      return typeof id === "string" ? document.getElementById(id) : id;
    }
    // 判空
    ,valueIsEmpty:function(val) {
      return (val === null || val === "" || typeof val == "undefined")
    }
    // 记录必填字段（jui-required='required'）
    ,putreQuired:function(){
      requiredArray = []
      $.each($("[jui-required='required']"),function(inputIndex,inputItem){
          var required = $(inputItem).attr("jui-required")
          var inputType = $(inputItem).attr("j-type")
          var inputName = $(inputItem).attr("name")
          var json = {}
        if(inputType != 'radio'){
          json["name"] = inputName
          json["type"] = inputType
          requiredArray.push(json)
        }
      })
      _.initInput()
    }
    // 获得表单所填写的字段
    ,getField:function(id){
      var formData = _.valueIsEmpty(id)?$("form").serializeArray():$("#"+id).serializeArray()
      var values = {};
      var x;
      for(x in formData){
        values[formData[x].name] = formData[x].value;
      }
      return values
    }
    // 身份证验证
    ,isIdentityCard:function(cardId){
      var aCity = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
      21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",  
      34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",  
      43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"  
      ,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",  
      64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
      var iSum = 0 ;
      var info = "" ;
      if(!/^\d{17}(\d|x)$/i.test(cardId)){
        return "身份证长度或格式错误";
      }
      cardId=cardId.replace(/x$/i,"a");
      if(aCity[parseInt(cardId.substr(0,2))] == null){
        return "城市地区不正确";
      }
      sBirthday = cardId.substr(6,4)+"-"+Number(cardId.substr(10,2))+"-"+Number(cardId.substr(12,2));
      var d = new Date(sBirthday.replace(/-/g,"/")) ;  
      if(sBirthday != (d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
        return "出生日期不正确";
      }
      // 以下验证为准确验证 一般情况 不考虑(如测试时)
      // for(var i = 17;i> = 0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(cardId.charAt(17 - i),11);
      // if(iSum%11 != 1){
      //   return "你输入的身份证号非法";
      // }
      return true;
    }
    // 表单验证
    ,verifyData:function(){
      var isOk = true;
      $("input").css("border","0")
      $("textarea").css("border","1px solid #f2f2f2")
      $.each(requiredArray,function(arrIndex,arrItem){
        var thatInput = $("[name='"+arrItem.name+"']")
        if((arrItem.type == "text" || arrItem.type == "textarea") && !_.valueIsEmpty(arrItem.type)){
          if(_.valueIsEmpty(thatInput.val())){
            thatInput.css("border","1px solid red");
            isOk = thatInput.attr('placeholder') || '请将信息填写完整';
            return false
          }
        }else if(arrItem.type == 'phone'){
          var phoneNo = /^1[34578]\d{9}$/;
          if(_.valueIsEmpty(thatInput.val())){
            thatInput.css("border","1px solid red");
            isOk = thatInput.attr('placeholder') || '请将信息填写完整';
            return false
            // return false
          }else if(!phoneNo.test(thatInput.val())){
            thatInput.css("border","1px solid red");
            isOk = '请输入正确的手机号码';
            return false
          }
        }else if(arrItem.type == 'identity'){
          if(_.isIdentityCard(thatInput.val()) != true){
            thatInput.css("border","1px solid red");
            isOk = '请输入正确的身份证号码';
            return false
          }
        }else if(arrItem.type == 'mail'){
          var isEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
          if(!isEmail.test(thatInput.val())){
            thatInput.css("border","1px solid red");
            isOk = "请输入正确的邮箱地址"
            return false
          }
        }else if(arrItem.type == 'select'){
          if(thatInput.val() == '-1'){
            isOk = thatInput.find('option:selected').text();
            return false
          }
        }
      })
      return isOk;
    }
    // toast （自动关闭弹层）
    ,juiToast:function(title,type,speed){
      var toastImage = ""
      var toastDomStart = "<div id='jui-toast' style='position:fixed;width:100%;height:100%;max-width:640px;margin:0 auto;z-index:1000;'>\
        <div style='top:50%;left:50%;bottom:50%;right:50%;transform:translate(-50%,-50%);position:relative;width:40vw;height:35vw;background-color:rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius:5px;'>\
          <div style='position:relative;top:50%;left:50%;bottom:50%;right:50%;transform:translate(-50%,-50%);'>"
          toastImage = "<img src='assets/images/jg-img.png' style='width:45px;margin-bottom:14vw;position:relative'>"
      if(type == "success"){
        toastImage = "<img src='assets/images/cg-img.png' style='width:45px;margin-bottom:14vw;position:relative'>"
      }else if(type == "warning"){
        toastImage = "<img src='assets/images/jg-img.png' style='width:45px;margin-bottom:14vw;position:relative'>"
      }else if(type == "error"){
        toastImage = "<img src='assets/images/jg-img.png' style='width:45px;margin-bottom:14vw;position:relative'>"
      }
      var toastDomEnd = "<div style='text-align: center;font-size:4vw;margin-top:-14vw;padding:0 5px'>"+title+"</div>\
          </div>\
        </div>\
      </div>"
      $('#toast-panel').before(toastDomStart + toastImage + toastDomEnd)
      setTimeout(function(){
        $("#jui-toast").remove()
      },speed || 1500)
    }
    // 分享页面
    ,juiShare:function(){
      var dom = "<div class='sharePage' id='sharePage' style='z-index:10000' onclick='j.clearShare()'>\
        <img src='assets/images/share.png' class='animate_translate_share' style='width:50px;width: 40vw;position: absolute;top: 15vw;right: 12vw;'>\
      </div>"
      $('body').append(dom)
    }
    // 分享页消失
    ,clearShare:function(){
      $("#sharePage").remove()
    }
    // [name='xxx']去重
    ,reSetName:function(){
      var thatName = name
      var isset = false;
      while (false == isset) {
        if($('[name='+thatName+']').length > 0) {
          var nameIndex = thatName.indexOf("_")
          if(nameIndex > 0){
            thatName = _.cutStr(thatName,'before',"_")+"_"+(parseInt(thatName.substr(nameIndex+1,thatName.length)) + 1)
          } else {
            thatName = thatName + "_1"
          }
        } else {
          isset = true;
        }
      }
      return thatName
    }
    // 修复IOS端inpu顶上去下不来
    ,initInput:function(){
      const windowHeight = window.innerHeight
      var $input = $("input,select,textarea");
      $input.on('blur', function(){
        let windowFocusHeight = window.innerHeight
        // if (windowHeight == windowFocusHeight) {
        //   return
        // }
        let currentPosition;
        let speed = 1; //页面滚动距离
        currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition); //页面向上滚动
        currentPosition += speed; //speed变量
        window.scrollTo(0, currentPosition); //页面向下滚动 
      })
    }
    // 字段截取 before:前 after:后
    ,cutStr:function(assign){
      var strIndex = str.indexOf(assign)
      if(position == "before"){
        if(strIndex > 0){
          return str.substr(0,strIndex);
        }else{
          return ""
        }
        return false
      }else if(position == "after"){
        if(strIndex > 0){
          return str.substr(strIndex,str.length);
        }else{
          return ""
        }
        return false
      }
    }
    // 弹出层 title:标题 content:内容 btnText:按钮字 callback:需要触发某个事件的方法 isClear(boolean):是否需要取消按钮
    ,juiPopup:function(title,content,btnText,cellback,isClear){
      $('#jui-popup').remove()
      _.removePopup()
      var alertBox = ''
      var btnBox = ""
      var btnText = btnText||"我知道了"
       alertBox = "<div id='jui-popup' style='position:fixed;z-index:999;width:100%;height:100%;top:0;left:0;right:0;margin:0 auto;max-width:640px;background-color:rgba(0,0,0,0.65);display:none'>\
          <div style='padding:10px 15px;padding-bottom:20px;background-color:#fff;position: relative;top:20%;width:75%;margin:0 auto;border-radius:10px;max-height: 100vw;overflow: auto;-webkit-overflow-scrolling:touch;'>\
            <div style='text-align:center;padding:10px 0;'>\
              <img src='assets/images/left-dot.png' style='width:20px;'>\
              <span style='font-size:5vw;color:#183989;font-weight:bold'>"+title+"</span>\
              <img src='assets/images/right-dot.png' style='width:20px;'>\
            </div>\
            <div style='color:#40444C;font-size:4vw;text-align:left;padding-bottom:20px'>"+content+"\
          </div>"
        if(isClear){
          btnBox = "<div style='overflow: hidden'>\
            <div style='width:48%;margin-left:0%;float:left;padding:3vw 0;border-radius:5px;background-color:#A4A4A4;color:#fff;text-align:center;' onclick='j.clearAlert()'>取消</div>\
            <div style='width:48%;margin-left:4%;float:left;padding:3vw 0;border-radius:5px;background-color:#80ECDE;color:#fff;box-shadow:0px 10px 20px 0px rgba(59,212,229,0.25);text-align:center' onclick='"+(cellback||'j.clearAlert()')+"'>"+btnText+"</div>\
          </div>\
          </div>"
        }else{
          btnBox = "<div style='padding:3vw 0;border-radius:5px;background-color:#80ECDE;color:#fff;box-shadow:0px 10px 20px 0px rgba(59,212,229,0.25);text-align:center' onclick='"+(cellback||'j.clearAlert()')+"'>"+btnText+"</div>\
          </div>"
        }
      $("body").append(alertBox + btnBox)
      $('#jui-popup').fadeIn()
    }
    // loading框
    ,juiLoading:function(title,type){
      _.removePopup()
      var toastImage = ""
      var toastDomStart = "<div id='jui-loading' style='position:fixed;width:100%;height:100%;max-width:640px;margin:0 auto;top:0;z-index:1000;'>\
        <div style='top:50%;left:50%;bottom:50%;right:50%;transform:translate(-50%,-50%);position:relative;width:40vw;height:35vw;background-color:rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius:5px;'>\
          <div style='top:50%;left:50%;bottom:50%;right:50%;transform:translate(-50%,-50%);position:relative;'>"
      if(type == "1"){
        toastImage = "<img src='assets/images/loading.gif' style='width:40px;margin-bottom:14vw;position:relative'>"
      }
      var toastDomEnd = "<div style='text-align: center;font-size:4vw;margin-top:-14vw'>"+title+"</div>\
          </div>\
        </div>\
      </div>"
      $('body').append(toastDomStart + toastImage + toastDomEnd)
      // setTimeout(function(){
      //   $("#jui-toast").remove()
      // },speed || 1500)
    }
    // 移除juiPopup 弹出层
    ,clearAlert:function(){
      $('#jui-popup').fadeOut(500)
      setTimeout(function(){
        $('#jui-popup').remove()
      },500)
    }
    // 移除类似 toast的弹出层
    ,removePopup:function(){
      $("#jui-toast,#jui-loading").fadeOut()
      setTimeout(function(){
        $("#jui-toast,#jui-loading").remove()
      },500)
    }
    // 倒计时
    ,myCountdown:function(){
      if (jCountdown === 1) {
        jCountdown = 60;
        return;
      }else {
        jCountdown --
        return jCountdown
      }
      setTimeout(function() { 
        _.myCountdown();
      },1000);
    }
  }
  window._ = _;
})(document);
var j = _
