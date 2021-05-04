/*
微信公众号：柠檬玩机交流
柠檬富豪小镇
下载地址：https://hyskgame.com/apps/fuhaoxiaozhen/wxshare/index.html?createAt=1619750062&senderUserId=152420&senderInviteCode=HG7X&entryPointData=eyJzZW5kZXJVc2VySWQiOiIxNTI0MjAifQ

TG电报群: https://t.me/ningmeng666
微信公众号：柠檬玩机交流
圈X

[rewrite_local]
#柠檬富豪小镇
https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions url script-request-body https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js
[MITM]
hostname = sunnytown.hyskgame.com
#loon
https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions url script-request-body https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js, requires-body=true, timeout=10, tag=柠檬富豪小镇
#surge
柠檬富豪小镇 = type=https://sunnytown.hyskgame.com/api/messages\SaccessToken=\w+&msgtype=system_getGpvGameOptions,requires-body=1,max-size=0,script-path=https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js,script-update-interval=0
*/

// [task_local]
//#柠檬富豪小镇
// */10 * * * * https://ghproxy.com/https://raw.githubusercontent.com/panghu999/ningmeng/main/fhxz.js, tag=柠檬富豪小镇, enabled=true
const $ = new Env('富豪小镇'); 
 let status; 
 status = (status = ($.getval("fhxzstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符 
 const fhxzurlArr = [], fhxzhdArr = [],fhxzcount = '' 
 let times = Math.round(Date.now() / 1000) 
 let fhxzurl = $.getdata('fhxzurl') 
 let fhxzhd = $.getdata('fhxzhd') 
 let sjs = 1 
let cj = '[{"type":"lottery_draw","data":{"priceType":3001}}]'
let gj = '[{"type":"pet_buyPet","data":{}}]'
let cd = '[{"type":"pet_feedPetFood","data":{}}]'
let rqq = '[{"type":"carBox_receiveBoxReward","data":{}}]'
let id = ""
let xl1 = '[{"type":"farmland_repair","data":{"farmlandDefId":1}}]'
let xl2 = '[{"type":"farmland_repair","data":{"farmlandDefId":2}}]'
let xl3 = '[{"type":"farmland_repair","data":{"farmlandDefId":3}}]'
let xl4 = '[{"type":"farmland_repair","data":{"farmlandDefId":4}}]'
let xl5 = '[{"type":"farmland_repair","data":{"farmlandDefId":5}}]'
let xl6 = '[{"type":"farmland_repair","data":{"farmlandDefId":6}}]'
let xl7 = '[{"type":"farmland_repair","data":{"farmlandDefId":7}}]'
let xl8 = '[{"type":"farmland_repair","data":{"farmlandDefId":8}}]'
let xl9 = '[{"type":"farmland_repair","data":{"farmlandDefId":9}}]'

let sq1 = '[{"type":"farmland_harvest","data":{"farmlandDefId":1}}]'
let sq2 = '[{"type":"farmland_harvest","data":{"farmlandDefId":2}}]'
let sq3 = '[{"type":"farmland_harvest","data":{"farmlandDefId":3}}]'
let sq4 = '[{"type":"farmland_harvest","data":{"farmlandDefId":4}}]'
let sq5 = '[{"type":"farmland_harvest","data":{"farmlandDefId":5}}]'
let sq6 = '[{"type":"farmland_harvest","data":{"farmlandDefId":6}}]'
let sq7 = '[{"type":"farmland_harvest","data":{"farmlandDefId":7}}]'
let sq8 = '[{"type":"farmland_harvest","data":{"farmlandDefId":8}}]'
let sq9 = '[{"type":"farmland_harvest","data":{"farmlandDefId":9}}]'

let sc1 = '[{"type":"farmland_plant","data":{"farmlandDefId":1,"priceType":3001}}]'
let sc2 = '[{"type":"farmland_plant","data":{"farmlandDefId":2,"priceType":3001}}]'
let sc3 = '[{"type":"farmland_plant","data":{"farmlandDefId":3,"priceType":3001}}]'
let sc4 = '[{"type":"farmland_plant","data":{"farmlandDefId":4,"priceType":3001}}]'
let sc5 = '[{"type":"farmland_plant","data":{"farmlandDefId":5,"priceType":3001}}]'
let sc6 = '[{"type":"farmland_plant","data":{"farmlandDefId":6,"priceType":3001}}]'
let sc7 = '[{"type":"farmland_plant","data":{"farmlandDefId":7,"priceType":3001}}]'
let sc8 = '[{"type":"farmland_plant","data":{"farmlandDefId":8,"priceType":3001}}]'
let sc9 = '[{"type":"farmland_plant","data":{"farmlandDefId":9,"priceType":3001}}]'

let qtjs = '[{"type":"farmland_speedUpAll","data":{"farmlandDefId":0}}]'
let ptjs1 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":1,"priceType":2002}}]'
let ptjs2 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":2,"priceType":2002}}]'
let ptjs3 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":3,"priceType":2002}}]'
let ptjs4 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":4,"priceType":2002}}]'
let ptjs5 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":5,"priceType":2002}}]'
let ptjs6 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":6,"priceType":2002}}]'
let ptjs7 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":7,"priceType":2002}}]'
let ptjs8 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":8,"priceType":2002}}]'
let ptjs9 = '[{"type":"farmland_speedUp","data":{"farmlandDefId":9,"priceType":2002}}]'
let rw1 = '[{"type":"dailyQuest_receiveReward","data":{"questDefId":2001,"questType":2}}]'
 !(async () => { 
 if (typeof $request !== "undefined") { 
 await fhxzck() 
   } else {fhxzurlArr.push($.getdata('fhxzurl')) 
 fhxzhdArr.push($.getdata('fhxzhd')) 
 let fhxzcount = ($.getval('fhxzcount') || '1'); 
 for (let i = 2; i <= fhxzcount; i++) { 
 fhxzurlArr.push($.getdata(`fhxzurl${i}`)) 
 fhxzhdArr.push($.getdata(`fhxzhd${i}`)) 
 } 
 console.log(`------------- 共${fhxzhdArr.length}个账号-------------\n`) 
 for (let i = 0; i < fhxzhdArr.length; i++) { 
 if (fhxzhdArr[i]) { 
   fhxzurl = fhxzurlArr[i]; 
 fhxzhd = fhxzhdArr[i]; 
 $.index = i + 1; 
 console.log(`\n开始【富豪小镇${$.index}】`) 
  await  quantijs(); //全体加速
 await $.wait(1000);
  
  await jqgj(); //机器管家
    await $.wait(15000);
await gjcd();//管家充电
    await $.wait(7000);
await zdcj();//自动抽奖
    await $.wait(10000);
await krqq();//热气球/汽车
  await $.wait(1000);
     await ptjsd1();
   await $.wait(10000);
   await xld1();
   await $.wait(10000);
    await sqd1();
await $.wait(10000);
 await scd1();
  await $.wait(1000);
  
   await ptjsd2();
   await $.wait(10000);
   await xld2();
   await $.wait(10000);
    await sqd2();
await $.wait(10000);
 await scd2();
  await $.wait(1000);
  
   await ptjsd3();
   await $.wait(10000);
   await xld3();
   await $.wait(10000);
    await sqd3();
await $.wait(10000);
 await scd3();
  await $.wait(1000);
  
   await ptjsd4();
   await $.wait(10000);
   await xld4();
   await $.wait(10000);
    await sqd4();
await $.wait(10000);
 await scd4();
  await $.wait(1000);
  
   await ptjsd5();
   await $.wait(10000);
   await xld5();
   await $.wait(10000);
    await sqd5();
await $.wait(10000);
 await scd5();
  await $.wait(1000);
  
   await ptjsd6();
   await $.wait(10000);
   await xld6();
   await $.wait(10000);
    await sqd6();
await $.wait(10000);
 await scd6();
  await $.wait(1000);
  
   await ptjsd7();
   await $.wait(10000);
   await xld7();
   await $.wait(10000);
    await sqd7();
await $.wait(10000);
 await scd7();
  await $.wait(1000);
  
  await ptjsd8();
   await $.wait(10000);
   await xld8();
   await $.wait(10000);
    await sqd8();
await $.wait(10000);
 await scd8();
  await $.wait(1000);
  await ptjsd9();
   await $.wait(10000);
   await xld9();
   await $.wait(10000);
    await sqd9();
await $.wait(10000);
 await scd9();
  await $.wait(1000);
  
  await xld1();
 await $.wait(10000);
 await sqd1();
await $.wait(10000);
 await scd1();
await $.wait(1000);
  await xld2();
 await $.wait(10000);
 await sqd2();
await $.wait(10000);
 await scd2();
await $.wait(1000);
  await xld3();
 await $.wait(10000);
 await sqd3();
await $.wait(10000);
 await scd3();
await $.wait(1000);
  await xld4();
 await $.wait(10000);
 await sqd4();
await $.wait(10000);
 await scd4();
await $.wait(1000);
  await xld5();
 await $.wait(10000);
 await sqd5();
await $.wait(10000);
 await scd5();
await $.wait(1000);
  await xld6();
 await $.wait(10000);
 await sqd6();
await $.wait(10000);
 await scd6();
await $.wait(1000);
  await xld7();
 await $.wait(10000);
 await sqd7();
await $.wait(10000);
 await scd7();
await $.wait(1000);
 //await quantijs();
  await xld8();
 await $.wait(10000);
 await sqd8();
await $.wait(10000);
 await scd8();
await $.wait(1000);
  await xld9();
 await $.wait(10000);
 await sqd9();
await $.wait(10000);
 await scd9();
//await $.wait(1000);
   } 
 }} 
   })() 
 .catch((e) => $.logErr(e)) 
 .finally(() => $.done()) 
 //数据获取 
     function fhxzck() { 
 if ($request.url.indexOf("system_getGpvGameOptions") > -1) { 
 const fhxzurl = $request.url 
id = fhxzurl.match(/token=(\S+)/)
$.log(id)
 if(fhxzurl) $.setdata(fhxzurl,`fhxzurl${status}`) 
 $.log(fhxzurl) 
 const fhxzhd = JSON.stringify($request.headers) 
 if(fhxzhd) $.setdata(fhxzhd,`fhxzhd${status}`) 
 $.log(fhxzhd) 
 $.msg($.name,"",'富豪小镇'+`${status}` +'数据获取成功！') 
 } 
 } 
//抽奖

function zdcj(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=lottery_draw', 

body : cj,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 
if(data.match(/lottery_draw/) == 'lottery_draw'){ 
 $.log(`抽奖成功 剩余次数:`+data.match(/remainingTimes":(\d+),/)[1])

 } else { 
 $.log(`抽奖次数不足`) 
 

 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
 
//开启管家
function jqgj(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=pet_buyPet', 

body : gj,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/pet_buyPet/) == 'pet_buyPet'){ 
 $.log(`机器管家开启成功:`)
await gjcd();
    
 } else { 
 $.log("机器管家开启失败或已经开启") 
//await gjcd();
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

//管家充电
function gjcd(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=pet_feedPetFood', 

body : cd,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/pet_feedPetFood/) == 'pet_feedPetFood'){ 
 $.log(`充电成功 剩余次数:`+data.match(/remainingFeedTimes":(\d+),/)[1])


 } else { 
 $.log(`机器管家充电失败次数`) 

 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

//热气球 小车
function krqq(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=carBox_receiveBoxReward', 

body : rqq,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/carBox_receiveBoxReward/) == 'carBox_receiveBoxReward'){ 
 $.log(`热气球/小车开启成功 剩余次数:`+data.match(/boxRemainingTimes":(\d+),/)[1])


 } else { 
 $.log(`热气球/小车开启失败次数不足或速度太快`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

//修理部分
function xld1(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl1,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`1号田修理成功`)


 } else { 
 $.log(`1号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function xld2(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl2,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`2号田修理成功`)


 } else { 
 $.log(`2号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function xld3(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl3,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`3号田修理成功`)


 } else { 
 $.log(`3号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function xld4(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl4,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`4号田修理成功`)


 } else { 
 $.log(`4号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function xld5(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl5,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`5号田修理成功`)


 } else { 
 $.log(`5号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function xld6(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl6,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`6号田修理成功`)


 } else { 
 $.log(`6号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function xld7(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl7,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`7号田修理成功`)


 } else { 
 $.log(`7号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function xld8(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl8,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`8号田修理成功`)


 } else { 
 $.log(`8号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function xld9(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_repair', 

body : xl9,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_repair/) == 'farmland_repair'){ 
 $.log(`9号田修理成功`)


 } else { 
 $.log(`9号田无需修理`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
//收取
function sqd1(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq1,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){ 
 $.log(`1号田收取成功`)


 } else { 
 $.log(`1号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function sqd2(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq2,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){ 
 $.log(`2号田收取成功`)


 } else { 
 $.log(`2号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function sqd3(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq3,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){ 
 $.log(`3号田收取成功`)


 } else { 
 $.log(`3号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function sqd4(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq4,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){ 
 $.log(`4号田收取成功`)


 } else { 
 $.log(`4号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 



function sqd5(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq5,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){ 
 $.log(`5号田收取成功`)


 } else { 
 $.log(`5号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function sqd6(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq6,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){  
 $.log(`6号田收取成功`)


 } else { 
 $.log(`6号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function sqd7(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq7,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){  
 $.log(`7号田收取成功`)


 } else { 
 $.log(`7号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function sqd8(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq8,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){  
 $.log(`8号田收取成功`)


 } else { 
 $.log(`8号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function sqd9(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_harvest', 

body : sq9,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_harvest/) == 'farmland_harvest'){  
 $.log(`9号田收取成功`)


 } else { 
 $.log(`9号田收取失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
//生产
function scd1(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc1,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`1号田生产成功`)


 } else { 
 $.log(`1号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function scd2(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc2,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`2号田生产成功`)


 } else { 
 $.log(`2号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function scd3(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc3,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`3号田生产成功`)


 } else { 
 $.log(`3号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function scd4(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc4,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`4号田生产成功`)


 } else { 
 $.log(`4号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function scd5(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc5,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
$.log(`5号田生产成功`)


 } else { 
 $.log(`5号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function scd6(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc6,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`6号田生产成功`)


 } else { 
 $.log(`6号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 


function scd7(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc7,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`7号田生产成功`)


 } else { 
 $.log(`7号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function scd8(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc8,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`8号田生产成功`)


 } else { 
 $.log(`8号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function scd9(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_plant', 

body : sc9,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_plant/) == 'farmland_plant'){ 
 $.log(`9号田生产成功`)


 } else { 
 $.log(`9号田生产失败或还没熟`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
//全体加速
function quantijs(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUpAll', 

body : qtjs,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUpAll/) == 'farmland_speedUpAll'){ 
  
$.log(`全体加速成功 剩余次数：`+data.match(/remainingAllTimes":(\d+),/)[1])

 await xld1();
 await $.wait(10000);
 await sqd1();
await $.wait(10000);
 await scd1();
await $.wait(1000);
  await xld2();
 await $.wait(10000);
 await sqd2();
await $.wait(10000);
 await scd2();
await $.wait(1000);
  await xld3();
 await $.wait(10000);
 await sqd3();
await $.wait(10000);
 await scd3();
await $.wait(1000);
  await xld4();
 await $.wait(10000);
 await sqd4();
await $.wait(10000);
 await scd4();
await $.wait(1000);
  await xld5();
 await $.wait(10000);
 await sqd5();
await $.wait(10000);
 await scd5();
await $.wait(1000);
  await xld6();
 await $.wait(10000);
 await sqd6();
await $.wait(10000);
 await scd6();
await $.wait(1000);
  await xld7();
 await $.wait(10000);
 await sqd7();
await $.wait(10000);
 await scd7();
await $.wait(1000);
 await xld8();
 await $.wait(10000);
 await sqd8();
await $.wait(10000);
 await scd8();
 await $.wait(1000);
 await xld9();
 await $.wait(10000);
 await sqd9();
await $.wait(10000);
 await scd9();
 } else { 
 $.log(`全体加速失败或次数不够`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 


//普通加速
function ptjsd1(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs1,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`1号田普通加速成功`)


 } else { 
 $.log(`1号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function ptjsd2(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs2,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`2号田普通加速成功`)


 } else { 
 $.log(`2号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function ptjsd3(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs3,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`3号田普通加速成功`)


 } else { 
 $.log(`3号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 


function ptjsd4(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id)  
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs4,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`4号田普通加速成功`)


 } else { 
 $.log(`4号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function ptjsd5(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs5,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`5号田普通加速成功`)


 } else { 
 $.log(`5号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 

function ptjsd6(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
 //$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs6,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`6号田普通加速成功`)


 } else { 
 $.log(`6号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function ptjsd7(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs7,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`7号田普通加速成功`)


 } else { 
 $.log(`7号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 


function ptjsd8(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs8,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`8号田普通加速成功`)


 } else { 
 $.log(`8号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 
function ptjsd9(timeout = 0) { 
 return new Promise((resolve) => { 
   
id = fhxzurl.match(/Token=\S+&/)
//$.log(id) 
   let url = { 
 url : 'https://sunnytown.hyskgame.com/api/messages?access'+id+'msgtype=farmland_speedUp', 

body : ptjs9,
   } 
 $.post(url, async (err, resp, data) => { 

   try { 

if(data.match(/farmland_speedUp/) == 'farmland_speedUp'){ 
 $.log(`9号田普通加速成功`)


 } else { 
 $.log(`9号田普通加速失败或熟了`) 
 
 } 
   } catch (e) { 
 $.logErr(e, resp); 
 } finally { 
 resolve() 
 } 
 },timeout) 
 }) 
 } 








function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
