/*

修改自执意Ariszy的jrtt.js脚本
目前包含：
签到
吃饭补贴
农场签到
农场三餐补贴
农场领水滴
农场每日任务
开农场宝箱
农场浇水
农场补充水滴
农场离线奖励(农场宝箱开完后，需要进农场再运行脚本才能开，待测试)
##通过农场浇水激活上线，达到获取理想奖励目的，目前测试每天的离线奖励足够开启农场5个宝箱，不需要做其他任务，具体情况看后期是否需要，再添加除虫，开地，施肥，三餐奖励以及农场签到活动
20点睡觉，获取完全后（3600）或睡觉12小时，自动醒来（待测试）

带完成：
开首页宝箱
读文章30篇（具体效果自测）
自动收取睡觉金币


脚本初成，非专业人士制作，欢迎指正

#右上角签到即可获取签到cookie
#进一次农场即可获取农场cookie

这个未修复
#读文章弹出金币获取读文章cookie

6.29 修复，测试

[mitm]
hostname = *.toutiaoapi.com

#圈x
[rewrite local]
\/score_task\/v1\/task\/(sign_in|get_read_bonus) url script-request-header https://raw.githubusercontent.com/NickyKwan/JavaScript/main/JS/jrtt/jrttxf.js
\/ttgame\/game_farm\/home_info url script-request-header https://raw.githubusercontent.com/NickyKwan/JavaScript/main/JS/jrtt/jrttxf.js
luckycat/lite/v1/sign_in/* url script-request-header https://raw.githubusercontent.com/NickyKwan/JavaScript/main/JS/jrtt/jrttxf.js

[task]
5,35 8-23 * * * https://raw.githubusercontent.com/NickyKwan/JavaScript/main/JS/jrtt/jrttxf.js, tag=今日头条极速版, enabled=true

*/

const $ = new Env('今日头条极速版')
const notify = $.isNode() ?require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("jrttcount") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const signurlArr = [],signkeyArr=[]
const farmurlArr = [],farmkeyArr=[]
const readurlArr = [],readkeyArr=[]
const infourlArr = [],infokeyArr=[]
let signurl = $.getdata('signurl')
let signkey = $.getdata('signkey')

let farmurl = $.getdata('farmurl')
let farmkey = $.getdata('farmkey')

let readurl = $.getdata('readurl')
let readkey = $.getdata('readkey')

let infourl = $.getdata('infourl')
let infokey = $.getdata('infokey')


let	boxbody = '[{open_treasure_box_enter_from": ""}]'

//var articles =''
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invit=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var coins='' //睡眠获取金币变量
var article =''
var collect = ''  //睡眠模块变量
var farmwater = ''   //农场浇水模块变量
var invited =''
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
//sign
  if (process.env.JRTTSIGNURL && process.env.JRTTSIGNURL.indexOf('#') > -1) {
   signurl = process.env.JRTTSIGNURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTSIGNURL && process.env.JRTTSIGNURL.indexOf('\n') > -1) {
   signurl = process.env.JRTTSIGNURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   signurl = process.env.JRTTSIGNURL.split()
  };
  if (process.env. JRTTSIGNKEY&& process.env.JRTTSIGNKEY.indexOf('#') > -1) {
   signkey = process.env.JRTTSIGNKEY.split('#');
  }
  else if (process.env.JRTTSIGNKEY && process.env.JRTTSIGNKEY.split('\n').length > 0) {
   signkey = process.env.JRTTSIGNKEY.split('\n');
  } else  {
   signkey = process.env.JRTTSIGNKEY.split()
  };
//farm
if (process.env.JRTTFARMURL && process.env.JRTTFARMURL.indexOf('#') > -1) {
   farmurl = process.env.JRTTFARMURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTFARMURL && process.env.JRTTFARMURL.indexOf('\n') > -1) {
   farmurl = process.env.JRTTFARMURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   farmurl = process.env.JRTTFARMURL.split()
  };
  if (process.env. JRTTFARMKEY&& process.env.JRTTFARMKEY.indexOf('#') > -1) {
   farmkey = process.env.JRTTFARMKEY.split('#');
  }
  else if (process.env.JRTTFARMKEY && process.env.JRTTFARMKEY.split('\n').length > 0) {
   farmkey = process.env.JRTTFARMKEY.split('\n');
  } else  {
   farmkey = process.env.JRTTFARMKEY.split()
  };
//read
if (process.env.JRTTREADURL && process.env.JRTTREADURL.indexOf('#') > -1) {
   readurl = process.env.JRTTREADURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTREADURL && process.env.JRTTREADURL.indexOf('\n') > -1) {
   readurl = process.env.JRTTREADURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   readurl = process.env.JRTTREADURL.split()
  };
  if (process.env. JRTTREADKEY&& process.env.JRTTREADKEY.indexOf('#') > -1) {
   readkey = process.env.JRTTREADKEY.split('#');
  }
  else if (process.env.JRTTREADKEY && process.env.JRTTREADKEY.split('\n').length > 0) {
   readkey = process.env.JRTTREADKEY.split('\n');
  } else  {
   readkey = process.env.JRTTREADKEY.split()
  };
//sign
  Object.keys(signurl).forEach((item) => {
        if (signurl[item]) {
          signurlArr.push(signurl[item])
        }
    });
    Object.keys(signkey).forEach((item) => {
        if (signkey[item]) {
          signkeyArr.push(signkey[item])
        }
    });
//farm
Object.keys(farmurl).forEach((item) => {
        if (farmurl[item]) {
          farmurlArr.push(farmurl[item])
        }
    });
    Object.keys(farmkey).forEach((item) => {
        if (farmkey[item]) {
          farmkeyArr.push(signkey[item])
        }
    });
//read
Object.keys(readurl).forEach((item) => {
        if (readurl[item]) {
          readurlArr.push(readurl[item])
        }
    });
    Object.keys(readkey).forEach((item) => {
        if (readkey[item]) {
          readkeyArr.push(readkey[item])
        }
    });
//info
Object.keys(infourl).forEach((item) => {
        if (infourl[item]) {
          infourlArr.push(infourl[item])
        }
    });
    Object.keys(infokey).forEach((item) => {
        if (infokey[item]) {
          infokeyArr.push(infokey[item])
        }
    });	
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    signurlArr.push($.getdata('signurl'))
    signkeyArr.push($.getdata('signkey'))
    farmurlArr.push($.getdata('farmurl'))
    farmkeyArr.push($.getdata('farmkey'))
    readurlArr.push($.getdata('readurl'))
    readkeyArr.push($.getdata('readkey'))
    infourlArr.push($.getdata('infourl'))
    infokeyArr.push($.getdata('infokey'))	
    let jrttcount = ($.getval('jrttcount') || '1');
  for (let i = 2; i <= jrttcount; i++) {
    signurlArr.push($.getdata(`signurl${i}`))
    signkeyArr.push($.getdata(`signkey${i}`))
    farmurlArr.push($.getdata(`farmurl${i}`))
    farmkeyArr.push($.getdata(`farmkey${i}`))
    readurlArr.push($.getdata(`readurl${i}`))
    readkeyArr.push($.getdata(`readkey${i}`))
    infourlArr.push($.getdata(`infourl${i}`))
    infokeyArr.push($.getdata(`infokey${i}`))	
  }
}
!(async () => {
if (!signurlArr[0]) {
    $.msg($.name, '【提示】请先获取今日头条极速版一cookie')
    return;
  }
   console.log(`------------- 共${signurlArr.length}个账号----------------\n`)
  for (let i = 0; i < signurlArr.length; i++) {
    if (signurlArr[i]) {
      other = ''
      signurl = signurlArr[i];
      signkey = signkeyArr[i];
      farmurl = farmurlArr[i];
      farmkey = farmkeyArr[i];
      readurl = readurlArr[i];
      readkey = readkeyArr[i];
      infourl = infourlArr[i];
      infokey = infokeyArr[i];	  
      $.index = i + 1;
      console.log(`\n开始【今日头条极速版${$.index}】`)
      await invite()           //用户邀请
      await userinfo()
      await profit()           //金币收益
////      await sign_in()          //签到
////      await openbox()          //开宝箱
////      await $.wait(2000);    //等待2秒  
////      await box_ad()          //开宝箱广告
////      await eat()	           //开饭	  
      //await reading()        //阅读
////      await farm_sign_in()   //农场签到
////   await openfarmbox()    //农场宝箱
////      await landwater()        //农场浇水  

      await double_reward()    //农场视频双倍
////      await farm_task1()        //农场每天任务
////      await farm_task2()        //农场每天任务
////      await farm_task3()        //农场每天任务	  
////      await farm_task4()        //农场每天任务	  
////      await farm_gift1()        //农场三餐
////      await farm_gift2()        //农场三餐
////      await farm_gift3()        //农场三餐	  
      await sleepstatus()      //睡觉状态
      await control()          //睡觉模块          
////      await sleepstart()        //睡觉
////      await sleepstop()         //起床
////      await collectcoins(coins) //收取睡觉金币
	  
	if(hour == 8){
	  await sign_in();        //签到
	  //await sign_in_ad();    //签到视频
      await farm_sign_in();   //农场签到
	  //await farm_sign_in_ad();    //农场签到视频
      await sleepstatus();     //睡觉状态
	  
	  await eat();           //早餐
	  await eat_ad();        //早餐视频

	  await farm_gift1();    //农场早餐
      await openfarmbox();   //农场宝箱
      await farmbox_ad();    //农场宝箱视频
      }
	  
	if(hour == 12){
	  await eat();           //午餐
	  await eat_ad();        //午餐视频

	  await farm_gift2();    //农场午餐
      await openfarmbox();   //农场宝箱
      await farmbox_ad();    //农场宝箱视频
      await water();         //农场浇水模块  
      await farm_task1();    //农场每天任务
      await $.wait(2000);    //等待2秒  
      await farm_task2();    //农场每天任务
      await $.wait(2000);    //等待2秒  
      await farm_task3();    //农场每天任务	  
      await $.wait(2000);    //等待2秒  
      await farm_task4();    //农场每天任务	 
      }
	  
	if(hour == 18){
	  await await eat();     //晚餐
	  await eat_ad();        //晚餐视频
	  await farm_gift3();    //农场晚餐
      await openfarmbox();   //农场宝箱
      await farmbox_ad();     //农场宝箱视频
      }
	  
	if(hour == 21){
	  await eat();           //宵夜
	  await eat_ad();        //宵夜视频
      await sleepstatus();   //睡觉状态
      await sleepstart();    //开始睡觉
	  
      await openfarmbox();   //农场宝箱
      await farmbox_ad();    //农场宝箱视频
      await water();         //农场浇水模块  
      }
	  
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
 if($request&&$request.url.indexOf("info")>=0) {
  const farmurlVal = $request.url.split(`?`)[1]
    if (farmurlVal) $.setdata(farmurlVal,
`farmurl${$.idx}`)
    $.log(`[${$.jsname}] 获取farm请求: 成功,farmirlVal: ${farmurl}`)
    $.msg(`获取farmurl: 成功🎉`, ``)
   const jrttfarmKey = JSON.stringify($request.headers)
$.log(jrttfarmKey)
  if(jrttfarmKey)        $.setdata(jrttfarmKey,`farmkey${$.idx}`)
    $.log(`[${$.jsname + $.idx}] 获取farm请求: 成功,jrttfarmKey: ${farmkey}`)
    $.msg(`获取farmkey: 成功🎉`, ``)
}
  if($request&&$request.url.indexOf("sign_in")>=0) {
  const signurlVal = $request.url.split(`?`)[1]
    if (signurlVal) $.setdata(signurlVal,
`signurl${$.idx}`)
    $.log(`[${$.jsname + $.idx}] 获取sign请求: 成功,signurlVal: ${signurl}`)
    $.msg(`获取signurl: 成功🎉`, ``)
   const jrttsignKey = JSON.stringify($request.headers)
//$.log(jrttsignKey)
  if(jrttsignKey.indexOf("STUB")>=0)
    $.setdata(jrttsignKey,`signkey${$.idx}`)
    $.log(`[${$.jsname + $.idx}] 获取sign请求: 成功,jrttsignKey: ${signkey}`)
    $.msg(`获取signkey: 成功🎉`, ``)
}

if($request&&$request.url.indexOf("get_read_bonus")>=0) {
  const readurlVal = $request.url.split(`?`)[1]

  //const article = readurlVal.replace(/\d{3}$/,Math.floor(Math.random()*1000));
//article = article.replace(/\d{3}$/, (Math.random()*1e3).toFixed(0).padStart(3,"0"));

    if(article) $.setdata(article,
'article')
    if (readurlVal) $.setdata(readurlVal,
`readurl${$.idx}`)
    $.log(`[${jsname + $.idx}] 获取read请求: 成功,readurlVal: ${readurl}`)
    $.msg(`获取readurl: 成功🎉`, ``)
   const jrttreadKey = JSON.stringify($request.headers)
$.log(jrttreadKey)
  if(jrttreadKey)        $.setdata(jrttreadKey,`readkey${$.idx}`)
    $.log(`[${jsname}] 获取read请求: 成功,jrttreadKey: ${readkey}`)
    $.msg(`获取readkey: 成功🎉`, ``)
    }
  }
//签到  
function sign_in() {
return new Promise((resolve, reject) => {
  let sign_inurl ={
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sign_in/action?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣首页签到\n'
          other +='签到完成\n'
          other +='获得'+result.data.score_amount+'金币\n'
          other +='连续签到'+result.data.sign_times+'天\n'
  
}else{
          other +='📣首页签到\n'
          other +='今日已完成签到\n'
           }
          resolve()
    })
   })
  } 

function sign_in_ad() {
return new Promise((resolve, reject) => {
  let url ={
    //url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/box/open?${farmurl}`,
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/box/open?${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.post(url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data) 
       other +='📣农场宝箱\n'
      if(result.status_code == 0) {
        other += "第"+(5-result.data.box_num)+"开启成功"
        other += "还可以开启"+result.data.box_num+"个\n"
        }
      else if(result.status_code == 5003){
        other +="已全部开启\n"
        }
          resolve()
    })
   })
  } 

//控制
async function control(){
   if(collect == 0){
      await sleepstart();
   }
   if(collect == 1){
      await sleepstop();
      await collectcoins(coins);
   }
   if(collect == 2){
      //$.log('no opreation')
      other +='\n\n生前何必久睡，死后自会长眠\n'
   }
   if(collect == 3){
      await collectcoins(coins);
   }
   if(invited == 4 && invit== 1){
      await invitation();
   }
}

//农场浇水模块
async function water() {
  //console.log(`📣执行【农场浇水】任务`)
  await landwater() //农场浇水

  if (farmwater == 0) {   //没有水了
    await $.wait(2000); //等待2秒  
	//console.log(`📣执行【补充水滴】成功`)
	await wateradd(); 
  } 
  if (farmwater == 1) {   //继续浇水
    await $.wait(2000); //等待2秒  
	//console.log(`📣执行【农场浇水】成功`)
	await water(); 
  }
}

function invite() {
return new Promise((resolve, reject) => {
  let inviteurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/user/new_tabs/?${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/score_task/v1/user/new_tabs/?${readurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(inviteurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)$.log(data)
      if(result.data.section[10].key=='mine_input_code') {
          invited=4;
           }else{
          invited=5;
}
          resolve()
    })
   })
  } 
  
function invitation() {
return new Promise((resolve, reject) => {
  let invitatonurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/invite/post_invite_code/?_request_from=web&device_platform=ios&ac=4G&${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/invite/post_invite_code/?_request_from=web&device_platform=ios&ac=4G&${readurl}`, 
    headers :JSON.parse(farmkey),
      timeout: 60000,
    body: JSON.stringify({"invitecode" : "931850705"})
}

   $.post(invitatonurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
          resolve()
    })
   })
  } 

function userinfo() {
return new Promise((resolve, reject) => {
  let userinfourl ={
    //url: `https://api3-normal-c-hl.snssdk.com/passport/account/info/v2/?${signurl}`,
    url: `https://security.snssdk.com/passport/account/info/v2/?${infourl}`,	
    headers :JSON.parse(signkey),
      timeout: 60000,
}
   $.get(userinfourl,(error, response, data) =>{
     const result = JSON.parse(data)
      //$.log(signurl+'\n'+signkey+'\n'+farmurl+'\n'+farmkey+'\n'+readurl+'\n'+readkey)
       if(logs) $.log(data)
      if(result.message == 'success') {
          other +='🎉'+result.data.name+'\n'
  
}     else if(result.message == 'error'){
          other += '⚠️异常:'+result.data.description+'\n'
           }else{
          other += '⚠️异常'
}
          resolve()
    })
   })
  } 
//金币收益
function profit() {
return new Promise((resolve, reject) => {
  let profiturl ={
    //url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/user/info/?${signurl}`,
    //url: `https://api3-normal-lf.toutiaoapi.com/score_task/v1/user/info/?${signurl}`,	
	url: `https://api3-normal-lf.toutiaoapi.com/score_task/v1/user/info/?${readurl}&sub_version=2`,	
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(profiturl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='🎉金币收益:'+result.data.score.amount+'\n🎉估计兑换现金:'+(result.data.score.amount/33000).toFixed(2)+'\n🎉'+'现金收益:'+result.data.cash.amount+'\n'      
}else{
          other += '⚠️异常\n'
           }
          resolve()
    })
   })
  } 

//文章阅读30篇每天
function reading() {
//const articles = readurl.replace(/\d{3}$/,Math.floor(Math.random()*1000));
  //const articles = readkey.replace(/\d{3}$/,Math.floor(Math.random()*1000));
  const articles = 6980881736284897000 + Math.floor(Math.random()*1000);
return new Promise((resolve, reject) => {
  let readingurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/task/get_read_bonus/?${articles}`,
	url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/activity/done_whole_scene_task/?${readurl}`,
    headers :JSON.parse(signkey),
	body :JSON.parse(readkey),
	//body :JSON.parse(articles),
    /*body :{
           "is_golden_egg": "false",
           //"scene_key": "article_detail",
		   //"group_id": "${articles}"
           //"group_id": "6980881736284897828"
		   "scene_key": "question_answer",
		   "group_id": "695313804672402475"
             },
	*/		 
      timeout: 60000,
}

   $.post(readingurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      other +='📣文章阅读\n'
      if(result.err_no == 0) {
          other +='阅读完成'
          other +='获得'+result.data.score_amount+'金币\n'
          //other +='阅读进度'+result.data.icon_data.done_times+'/'+result.data.icon_data.read_limit+'\n'
      }
	  else{
       if(result.err_no == 4){
          other +='文章阅读已达上限\n'
        }
       else{
          other +='这篇文章已经读过了\n'
        }
	      }	
          resolve()
    })
   })
  }
 
  
/* 原代码备份
   $.post(readingurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      other +='📣文章阅读\n'
      if(result.err_no == 0) {
          other +='阅读完成'
          other +='获得'+result.data.score_amount+'金币\n'
          other +='阅读进度'+result.data.icon_data.done_times+'/'+result.data.icon_data.read_limit+'\n'
      }
       if(result.err_no == 4){
          other +='文章阅读已达上限\n'
        }
       if(result.err_no == 1028){
          other +='这篇文章已经读过了\n'
        }
          resolve()
    })
   })
  }
*/ 
//农场签到
function farm_sign_in() {
return new Promise((resolve, reject) => {
  let farm_sign_inurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/reward/sign_in?watch_ad=1&${signurl}`,
      url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/sign_in?watch_ad=1&${signurl}`, 	  
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场签到\n'
      if(result.status_code == 0) {
          other +='签到完成\n'
         
}else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  } 
//开宝箱
function openbox() {
return new Promise((resolve, reject) => {
  let openboxurl ={
	url: `https://api3-normal-lf.toutiaoapi.com/score_task/v1/task/open_treasure_box/?${signurl}`,
    headers :JSON.parse(signkey),
	body: {"open_treasure_box_enter_from": ""},
      timeout: 60000,
}
   $.post(openboxurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣首页宝箱\n'
      if(result.err_no == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.score_amount+'个\n'
        }
      else{
         if(result.err_no == 9){
        other += result.err_tips+'\n'
        }else{
        other +="不在开宝箱时间\n"
           }
    }
          resolve()
    })
   })
  }  

//开箱视频
function box_ad() {
return new Promise((resolve, reject) => {
  let box_adurl ={
	url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/task/done/excitation_ad?${readurl}`,
    headers :JSON.parse(signkey),
	body :{
           "amount": "145",
           "ad_rit": "2",
           "is_post_login": "false",
           "score_source": "1",
           "ad_alias_position": "coin",
           "task_id": "188",
           "task_key": "excitation_ad",
           "coin_count": "145",
           "ad_from": "coin",
           "ad_id": "2"
           },
      timeout: 60000,
}
   $.post(box_adurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣开宝箱视频\n'
      if(result.err_no == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.score_amount+'个\n'
        }
      else{
         if(result.err_no == 9){
        other += result.err_tips+'\n'
        }else{
        other +="不在开宝箱时间\n"
           }
    }
          resolve()
    })
   })
  } 

//吃饭
function eat() {
return new Promise((resolve, reject) => {
  let eaturl ={
    //url: `https://it-lq.snssdk.com/score_task/v1/task/open_treasure_box/?${signurl}`,
	url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/eat/done_eat/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}
   $.post(eaturl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣开饭\n'
      if(result.err_no == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.score_amount+'个\n'
        }
      else{
         if(result.err_no == 9){
        other += result.err_tips+'\n'
        }else{
        other +="不在开饭时间\n"
           }
    }
          resolve()
    })
   })
  } 
  
//吃饭视频
function eat_ad() {
return new Promise((resolve, reject) => {
  let url ={
	url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/task/done/excitation_ad?${readurl}`,
    headers :JSON.parse(farmkey),
	body :{
      "extra": {"stage_score_amount": null},
      "ad_alias_position": "coin",
      "amount": 50,
      "ad_from": "coin",
      "act_common": {
        "sdk_version": "0.1.0",
        "act_data": "H4O1AzcSdx9YA7fD_gcPzQ",
        "settings_version": 15,
        "act_token": "xsEbJhtEc-n3eYdbwLYpezlWPH0-SPP_Dfb020hPmqfyCQrrL4x1NAuYstngkbfFwSnMeC42ve4LQUro0RS7mfOZNJXxIiXJVLOLRpnO887TdCGJQG4fkdfVJIJ61n6lDlstYhSv64eZXNK80Zm_4Xj5t47iPay4WH8PNN7vowg",
        "act_base": "6qvbXBO0-XKL6jyQzg8Q6qmambLEiqUw03D9RSA1cR1eRNihmxogiXR-_3SYJ-KRXozLP28SpGj2db13e6p6Ob7rcdmQTW6nQgomoyHyX9mCWABpqythlYsrRZdnt7ji24pZfxbd8vmYmeUEX_-fds8EOTsD_aJRCzXjofjKKIhtDwz9daEEz8HhRicrgzt1"},
      "task_id": "181",
      "is_post_login": false,
      "task_key": "excitation_ad",
      "ad_rit": 5,
      "score_source": 1,
      "coin_count": 50,
      "ad_id": 5
      },
      timeout: 60000,
}
   $.post(url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣吃饭视频\n'
      if(result.err_no == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.score_amount+'个\n'
        }
      else{
         if(result.err_no == 9){
        other += result.err_tips+'\n'
        }else{
        other +="不在吃饭时间\n"
           }
    }
          resolve()
    })
   })
  } 



//农场宝箱
function openfarmbox() {
return new Promise((resolve, reject) => {
  let openfarmboxurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/box/open?${farmurl}`,
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/box/open?${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(openfarmboxurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场宝箱\n'
      if(result.status_code == 0) {
        other += "第"+(5-result.data.box_num)+"开启成功"
        other += "还可以开启"+result.data.box_num+"个\n"
        }
      else if(result.status_code == 5003){
        other +="已全部开启\n"
        }
          resolve()
    })
   })
  }  
 
//农场宝箱视频
function farmbox_ad() {
return new Promise((resolve, reject) => {
  let farmbox_adurl ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/excitation_ad/add?$excitation_ad_score_amount=134&{farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}
   $.get(farmbox_adurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣开宝箱视频\n'
      if(result.status_code == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.incr_coin+'个\n'
        }
      else if(result.status_code == 5003){
        other +="已全部开启\n"
        }
          resolve()
    })
   })
  }

/*/
//农场浇水+补充水滴
async function water() {
  console.log(`📣执行【农场浇水】任务`)
  await landwater() //农场浇水

  if (landwater.status_code == '0') {
		//console.log(`${JSON.parse(data)}`)
    await $.wait(1000); //等待1秒  
	console.log(`📣执行【农场浇水】成功`)
	await water(); 
  } else {
	  
	//console.log(`没有水咯...`)  
	console.log(`📣执行【补充水滴】任务`)
    await wateradd(); //补充水滴

  }
}
*/
//农场浇水 
async function landwater() {
return new Promise((resolve, reject) => {
  let landwaterurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/land_water?tentimes=0${farmurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/land_water?tentimes=0&fivetimes=0&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(landwaterurl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
       other +='📣农场浇水\n'
      if(result.status_code == '0') {
        other += result.message+'\n'
        other += '💧水滴剩余'+result.data.water+'\n'
		farmwater = 1
        }
      else if(result.status_code == '5001'){
        other +=result.message+'\n'
	    console.log(`没有水咯...`)  
	    console.log(`📣执行【补充水滴】任务`)
		farmwater = 0 //await wateradd(); //补充水滴
           } 
	  else{
		  other +=result.message+'\n'
		farmwater = 2 //停止浇水
           }
          resolve()
    })
   })
  } 

//补充水滴
function wateradd() {
return new Promise((resolve, reject) => {
  let wateraddurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/land_water?tentimes=0${farmurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/water/add?${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(wateraddurl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
       other +='📣补充水滴\n'
      if(result.status_code == '0') {
        other += result.message+'\n'
        other += '💧补充水滴'+result.data.water+'\n'
        }
      else{
        other +=result.message+'\n'
           }
          resolve()
    })
   })
  } 
  
//done 这个离线奖励当宝箱全部开完后，需要进入农场再运行脚本，才能获取离线奖励，应该有一个判定，目前没有找到
//利用浇水激活进农场状态获取离线奖励，目前测试每天离线奖励足够开启农场5个宝箱，不需要做游戏加快生产，具体情况看后期是否需要，再考虑加做除虫，开地，三餐奖励
//农场视频双倍
function double_reward() {
return new Promise((resolve, reject) => {
  let double_rewardurl ={
    url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/double_reward?watch_ad=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}
   $.get(double_rewardurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
        other +='📣农场视频双倍离线奖励\n'
      if(result.status_code == 0) {
        other += '获得成功\n'
        }else if(result.status_code==5033){
            other += result.message+'\n'
          }
        else{
        other +='📣农场视频双倍离线奖励\n'
        other +="无离线产量可领取\n"
           }
          resolve()
    })
   })
  }

//农场每日任务
function farm_task1() {
return new Promise((resolve, reject) => {
  let farm_task1url ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/task?task_id=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_task1url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场每日任务\n'
      if(result.status_code == 0) {
          other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }    

function farm_task2() {
return new Promise((resolve, reject) => {
  let farm_task2url ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/task?task_id=2&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_task2url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场每日任务\n'
      if(result.status_code == 0) {
          other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }

function farm_task3() {
return new Promise((resolve, reject) => {
  let farm_task3url ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/task?task_id=3&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_task3url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场每日任务\n'
      if(result.status_code == 0) {
          other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }  

function farm_task4() {
return new Promise((resolve, reject) => {
  let farm_task4url ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/task?task_id=4&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_task4url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场每日任务\n'
      if(result.status_code == 0) {
          other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  } 
  
//农场三餐
function farm_gift1() {
return new Promise((resolve, reject) => {
  let farm_gift1url ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/gift?gift_id=1&watch_ad=0&double=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}
   $.get(farm_gift1url,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场早餐礼包\n'
      if(result.status_code == 0) {
        other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }  

function farm_gift2() {
return new Promise((resolve, reject) => {
  let farm_gifturl2 ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/gift?gift_id=2&watch_ad=0&double=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}
   $.get(farm_gifturl2,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场午餐礼包\n'
      if(result.status_code == 0) {
        other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }

function farm_gift3() {
return new Promise((resolve, reject) => {
  let farm_gifturl3 ={
	url: `https://api3-normal-lf.toutiaoapi.com/ttgame/game_farm/reward/gift?gift_id=3&watch_ad=0&double=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}
   $.get(farm_gifturl3,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场晚餐礼包\n'
      if(result.status_code == 0) {
        other +='已领取\n' 
        }else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  }
  
  
//睡觉状态
function sleepstatus() {
return new Promise((resolve, reject) => {
  let sleepstatusurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/status/?_request_from=web&${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sleep/status/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(sleepstatusurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='📣查询睡觉状态\n🎉查询'+result.err_tips+'\n'
           }
      if(result.data.sleeping == false){
          other +='当前状态:清醒着呢\n'
        if(hour >= 20||hour<=2){
           collect=0 //await sleepstart()
           }else{
if(result.data.history_amount!==0){ 
//即使没有满足3600也在睡觉12小时后停止，以防封号
         //coins=result.data.history_amount
		 coins=result.data.max_coin  //或者这个待定？
         collect =3 //collect coins
          }else{
         collect=2
}
}}
          else{
         other  +='当前状态:酣睡中,已睡'+parseInt(result.data.sleep_last_time/3600)+'小时'+parseInt((result.data.sleep_last_time%3600)/60)+'分钟'+parseInt((result.data.sleep_last_time%3600)%60)+'秒\n'
          other +='预计可得金币'+result.data.sleep_unexchanged_score+'\n'
          coins=result.data.sleep_unexchanged_score
         if(result.data.sleep_unexchanged_score == 3600 || parseInt(result.data.sleep_last_time/3600) >= 12){ 
//即使没有满足3600也在睡觉12小时后停止，以防封号
         collect =1 //collect coins&sleepstop
          }else{
         collect =2
}
   
     }
          resolve()
    })
   })
  } 
//开始睡觉
function sleepstart() {
return new Promise((resolve, reject) => {
  let sleepstarturl ={
    //url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/start/?_request_from=web&${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sleep/start/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sleepstarturl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣开始睡觉\n该睡觉了，开始睡觉'+result.err_tips+'\n'
  
}     else if(result.err_no == 1052){
          other +='📣开始睡觉\n'+result.err_tips+'\n'
           }else{
          other += '📣开始睡觉:'+'⚠️异常'
}
          resolve()
    })
   })
  } 
//停止睡觉
function sleepstop() {
return new Promise((resolve, reject) => {
  let sleepstopurl ={
    //url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/stop/?_request_from=web&${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sleep/stop/?${signurl}`,	
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sleepstopurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣停止睡觉\n'+result.err_tips+'\n'
          
}     else if(result.err_no == 1052){
          other += '📣停止睡觉\n'+'还没开始睡觉\n'
           }else{
          other +='📣停止睡觉:'+'\n⚠️异常'
}
          resolve()
    })
   })
  } 
//收取睡觉金币
function collectcoins(coins) {
return new Promise((resolve, reject) => {
  let collectcoinsurl ={
    //url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sleep/done_task/?_request_from=web&device_platform=undefined&${signurl}`,
    url: `https://api3-normal-lf.toutiaoapi.com/luckycat/lite/v1/sleep/done_task/?${signurl}`,
    headers :JSON.parse(signkey),
    body :JSON.stringify({score_amount: coins}),
      timeout: 60000,
}

   $.post(collectcoinsurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='📣收取金币\n'+result.err_tips+'     获得金币:'+coins
          
}     else{
          other +='📣收取金币:'+'\n⚠️异常:'+result.err_tips+''
}
          resolve()
    })
   })
  } 
async function showmsg() {
    if (tz == 1) {
      if ($.isNode()) {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          await notify.sendNotify($.name, other)
        } else {
          $.log(other)
        }
      } else {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          $.msg($.jsname, '', other)
        } else {
          $.log(other)
        }
      }
    } else {
      $.log(other)
  }
}

function Env(t,e){
	class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}