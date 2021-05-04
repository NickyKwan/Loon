/*
微信公众号：柠檬玩机交流
抖音抖一抖 自己助力
非专业人士制作/有什么BUG我也懒得管哈 由于今天没有关注好友的了 无法测试
只摇到邀请好友的9红包的才自己助力自己
每次不过是1分钱 不过到后面别人助力也才1分钱
TG电报群: https://t.me/ningmengwj
说明：
定时红包数据 打开活动页面就可获取
抖一抖数据需要自己手动抖一抖
本脚本以学习为主 请勿非法操作 一切由用户自己承担
#圈X
[rewrite_local]
https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/dou\S+ url script-request-header http://nm66.top/dyd.js
https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/main_info url script-request-header http://nm66.top/dydhb.js
[MITM]
hostname = activity3-aweme-lq.awemeughun.com
#loon
https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/dou\S+ url script-request-header http://nm66.top/dyd.js, requires-body=true, timeout=10, tag=抖音抖一抖
https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/main_info url script-request-header script-request-header http://nm66.top/dydhb.js, requires-body=true, timeout=10, tag=抖音抖一抖
#surge
抖音抖一抖 = type=https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/main_info,requires-header=1,max-size=0,script-path=script-request-header http://nm66.top/dydhb.js,script-update-interval=0
抖音抖一抖 = type=https://activity\d-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/dou\S+,requires-header=1,max-size=0,script-path=script-request-header http://nm66.top/dyd.js,script-update-interval=0
*/

// [task_local]

// */1 * * * * http://nm66.top/dyd.js, tag=抖音抖一抖, img-url=circles.hexagongrid.fill.system, enabled=true
// */60 * * * * http://nm66.top/dydhb.js, tag=抖音抖一抖, img-url=circles.hexagongrid.fill.system, enabled=true

const $ = new Env('dou1dou定时红包'); 
 let status; 
 status = (status = ($.getval("xnmstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符 
 const xnmurlArr = [], xnmhdArr = [],xnmcount = '' 
 let times = Math.round(Date.now() / 1000) 
 let xnmurl = $.getdata('xnmurl') 
 let xnmhd = $.getdata('xnmhd') 

let ua = 'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'
let jmdata;
const logs =0;
!(async () => { 
 if (typeof $request !== "undefined") { 
 await xnmck() 
  //await rwck()
   } 
   else 
   {
xnmurlArr.push($.getdata('xnmurl')) 
 xnmhdArr.push($.getdata('xnmhd')) 

 let xnmcount = ($.getval('xnmcount') || '1'); 
 for (let i = 2; i <= xnmcount; i++) { 
 xnmurlArr.push($.getdata(`xnmurl${i}`)) 
 xnmhdArr.push($.getdata(`xnmhd${i}`)) 
 } 
 
 console.log(`------------- 共${xnmhdArr.length}个账号-------------\n`) 
 for (let i = 0; i < xnmhdArr.length; i++) { 
 if (xnmhdArr[i]) { 
   xnmurl = xnmurlArr[i]; 
 xnmhd = xnmhdArr[i]; 
 $.index = i + 1; 
 console.log(`\n开始【dou1dou定时红包${$.index}】`) 
 

  await rwtk();

  await rwtk1();
    } 
 }} 
   })() 
 .catch((e) => $.logErr(e)) 
 .finally(() => $.done()) 
 //数据获取 https://activity3-aweme-lq.awemeughun.com/aweme/ughun/activity/mayday/hongbao_lottery/?version_code=15.7.0&js_sdk_version=2.6.0.7&tma_jssdk_version=2.6.0.7&app_name=aweme&app_version=15.7.0&vid=A99C05B1-F594-442E-B146-E31853BD39F8&device_id=36662104633&channel=App%20Store&slide_guide_has_shown=1&mcc_mnc=46001&aid=1128&minor_status=0&screen_width=1242&openudid=78ec57565bb66207f3ecb526886c15d05069dfb9&cdid=69ED3966-EFC0-4CA4-AEFB-F849905B32AB&os_api=18&ac=WIFI&os_version=14.3&appTheme=dark&device_platform=iphone&build_number=157011&is_vcd=1&device_type=iPhone9,2&iid=580992789137280&idfa=41E57B04-6883-4262-8929-439B4E505781
     function xnmck() { 
 if ($request.url.indexOf("mayday/main_info") > -1) { 
 const xnmurl = $request.url 

 if(xnmurl) $.setdata(xnmurl,`xnmurl${status}`) 
 $.log(xnmurl) 
 const xnmhd = JSON.stringify($request.headers) 
 if(xnmhd) $.setdata(xnmhd,`xnmhd${status}`) 
 $.log(xnmhd) 
 $.msg($.name,"",'dou1dou定时红包'+`${status}` +'数据获取成功！') 
 } 
 } 
 
 async function rwtk(){
 return new Promise((resolve) => {
    let plant6_url = {
   		url: xnmurl,
        headers: JSON.parse(xnmhd),
        //bady: "hit_follow_freq=&latitude=29.96923800998264&longitude=106.2868948025174&source=dou1dou"
   	}
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code  == 0)

          token1 = data.match(/token":"(.*?)"/)[1]
          //$.msg(result.task_token)
          $.log("定时红包数据：  "+token1)
          //$.log("token1  "+token1)
        if(result.status_code != 0)
          $.log(result.data.message)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function rwtk1(){
 return new Promise((resolve) => {
     url1 = xnmurl.replace('main_info','hongbao_lottery')
    let plant6_url = {
   		url: url1,
        headers: JSON.parse(xnmhd),
        body: 'latitude=29.96926215277778&longitude=106.286877983941&source=frontend_dou_random_follow&task_token='+token1,
   	}
   $.post(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data) 
        if(logs)$.log(data)
       if(result.status_code == 0)
 $.log(`恭喜你 定时红包领取成功 `)
          //$.log(result.button_info.text)
          //if(result.button_info.text == "邀请1位朋友")
          
          //$.log(data)
          ///$.msg(token1)
        if(result.status_code == 100002)
          $.log(`很遗憾 定时红包领取失败或还没冷却`+result.data.prompts)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}