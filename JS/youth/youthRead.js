/*
本脚本修改Sunert中青看点.再次感谢大佬
赞赏:中青邀请码`52049058`,农妇山泉 -> 有点咸，万分感谢
本脚本仅适用于中青看点极速版签加转盘领取青豆
获取body方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域下
#中青阅读body获取
hostname =  ios.baertt.com

圈X。其他软件请自行添加。获取大约200个Boy，删除重写
https://ios.baertt.com/v5/article/complete.json url script-request-body https://raw.githubusercontent.com/jiuli12/Script/main/youthRead.js


*/

const $ = new Env("中青看点自动阅读")
const notify = $.isNode() ? require('./sendNotify') : '';
$.idx = ($.idx = ($.getval('zqReadSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
let COOKIES_SPLIT = "&"; // 自定义多body之间连接的分隔符，默认为&分割，不熟悉的不要改动和配置

let ReadArr = []; 
let YouthBody = []; 
let ReadIndex = []; 
let YouthIndex = []; 

$.message = '';

if ($.isNode()) {
	if (process.env.COOKIES_SPLIT) {
	  COOKIES_SPLIT = process.env.COOKIES_SPLIT;
   }
   if (process.env.ZQGETBODY_BODY &&process.env.ZQGETBODY_BODY.indexOf(COOKIES_SPLIT) > -1) {
      YouthBody = process.env.ZQGETBODY_BODY.split(COOKIES_SPLIT);
    } else {
      YouthBody = process.env.ZQGETBODY_BODY.split();
    }
	
	if (process.env.INDEX &&process.env.INDEX.indexOf(COOKIES_SPLIT) > -1) {
	   YouthIndex = process.env.INDEX.split(COOKIES_SPLIT);
	 } else {
	   YouthIndex = process.env.INDEX.split();
	 }
}

if ($.isNode()) {
	Object.keys(YouthBody).forEach((item) => {
	  if (YouthBody[item]) {
	    ReadArr.push(YouthBody[item]);
	  }
	})
	Object.keys(YouthIndex).forEach((item) => {
	  if (YouthIndex[YouthIndex]) {
	    ReadIndex.push(YouthIndex[item]);
	  }
	})
} else {
	ReadArr.push($.getdata('zqgetbody_body'));
	ReadIndex.push($.getdata('index'));
	// 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
	let zqReadCount = ($.getval('zqReadCount') || '1') - 0;
	for (let i = 2; i <= zqReadCount; i++) {
	  if ($.getdata(`zqgetbody_body${i}`)) {
		  ReadArr.push($.getdata(`zqgetbody_body${i}`));
		  ReadIndex.push($.getdata(`index${i}`));
	  }
	}
}

let isGetCookie = typeof $request !== 'undefined';
if (isGetCookie) {
  GetCookie()
} else {
  !(async () => {
    await all();
    await msgShow();
  })()
      .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
      })
      .finally(() => {
        $.done();
      })
}

//获取Body
function GetCookie(){
	if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/article\/complete/)) {
		  const articlebodyVal = $request.body
		  let YBody=[];
		  if(articlebodyVal){
			   let bodys=$.getdata("zqgetbody_body"+$.idx);
			   if(bodys){
				  if(bodys.indexOf(articlebodyVal)!=-1){
				  	$.msg($.name + $.idx,`添加阅读请求: 失败🎉,body重复跳过`)
				  	$.done();
				  }
				  YBody = bodys.split('&');
				  bodys=articlebodyVal+'&'+bodys;
			   }else{
				   bodys=articlebodyVal;
			   }
			   $.setdata(bodys,"zqgetbody_body"+$.idx)
			   $.msg($.name + $.idx,`添加阅读请求: 成功🎉,当前body${YBody.length+1}`)
		  }
	}
}

async function all() {
	if (!ReadArr[0]) {
	    $.msg($.name, '提示：⚠️请点击前往中青阅读获取Body\n');
	    return;
	  } else {
		console.log(`============ 共${ReadArr.length}个${$.name}账号  =============\n`);
		console.log(`脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}\n`)
		
		for (let i = 0; i < ReadArr.length; i++) {
			let YBody = ReadArr[i].split('&');
			let RIndex = ReadIndex[i] ? ReadIndex[i] : "0";
			//转换int
			let intIndex = parseInt(RIndex);
			let articlebody = YBody[intIndex];
			await AutoRead(articlebody,intIndex,i)
			let nextIndex = (intIndex+1).toString()
			if(intIndex == YBody.length-1){
				if( i == 0){
				 	$.setdata("0","index")
				}else{
					$.setdata("0","index"+(i+1))
				}
			}else{
				if( i == 0){
				 	$.setdata(nextIndex,"index")
				}else{
					$.setdata(nextIndex,"index"+(i+1))
				}
			}
			
		}
	
	}
}
function AutoRead(articlebody,intIndex,i) {
 	return new Promise((resolve, reject) => {
		 let url = {
		      url: `https://ios.baertt.com/v5/article/complete.json`,
		      headers: {
			'User-Agent': 'KDApp/1.7.8 (iPhone; iOS 14.0; Scale/3.00)'
		      },
		      body: articlebody
		    };
		$.post(url, async (error, response, data) => {
			try{
				let readres = JSON.parse(data);  
				$.message +='========第'+ (i+1) +'个'+$.name+'账号========\n';
				if (readres.success ==true) {
				    if(typeof readres.items.read_score === 'number'  || typeof readres.items.score === 'number'){
					if(readres.items.max_notice =='看太久了，换1篇试试'|| readres.items.max_notice =='今日阅读到上限啦，去看视频赚青豆吧'){
					   $.message += '本次阅读第'+(intIndex+1)+'个Body未获取青豆。\n原因：'+readres.items.max_notice+'\n'; 
					 }else{
						 if(readres.items.read_score != undefined){
						    $.message +='本次阅读第'+(intIndex+1)+'个Body成功。\n获得'+readres.items.read_score+'个青豆\n';
						 }
						  if(readres.items.score != undefined){
						    $.message +='本次阅读第'+(intIndex+1)+'个Body成功。\n获得'+readres.items.score+'个青豆\n';
						 }
					 }
				   }else{
				  	 $.message += '本次阅读第'+(intIndex+1)+'个Body未获取青豆。\n原因：未获取到青豆信息\n'; 
				   }	
				}else {
					$.message += '本次阅读第'+(intIndex+1)+'个Body错误。\n错误信息：阅读请求失败\n'; 
 				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
		})
	});
}

function msgShow() {
	let zqReadLog = $.getdata('zqReadLog')||false;
	if(zqReadLog == "true"){
	   $.msg($.name, '', $.message);
	}
	console.log($.message);
} 

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
