/*
本脚本修改Sunert中青看点.再次感谢大佬
赞赏:中青邀请码`52049058`,农妇山泉 -> 有点咸，万分感谢
本脚本仅适用于中青看点极速版签加转盘领取青豆

获取Cookie方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域
下，运行时间自行配置
2. 获取Cookie方法，可随时更新
 ① 进入app，进入任务中心或者签到一次,即可获取Cookie. 
 ② 阅读一篇文章，获取阅读请求body，
 ③ 同时获取阅读时长，
 ④ 在阅读文章最下面有个惊喜红包，点击获取惊喜红包请求
3.增加转盘抽奖通知间隔，为了照顾新用户，前三次会有通知，以后默认每50次转盘抽奖通知一次，可自行修改❗️ 转盘完成后通知会一直开启
4.非专业人士制作，欢迎各位大佬提出宝贵意见和指导
5.增加每日打卡，打卡时间每日5:00-8:00❗️，请不要忘记设置运行时间，共4条Cookie，请全部获取，请注释重写
6. 支持账号运行。当转盘次数为50或者100并且余额大于10元时推送通知
~~~~~~~~~~~~~~~~
[MITM]
hostname = *.youth.cn, ios.baertt.com 
~~~~~~~~~~~~~~~~
Surge 4.0 :
[Script]
中青看点 = type=cron,cronexp=35 5 0 * * *,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js,script-update-interval=0
中青看点 = type=http-request,pattern=https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign),script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js
中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/article\/complete,script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/article\/red_packet,script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json,script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
~~~~~~~~~~~~~~~~
Loon 2.1.0+
[Script]
# 本地脚本
cron "04 00 * * *" script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, enabled=true, tag=中青看点
http-request https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign) script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js
http-request https:\/\/ios\.baertt\.com\/v5\/article\/complete script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
http-request https:\/\/ios\.baertt\.com\/v5\/article\/red_packet script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
http-request https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json script-path=https://raw.githubusercontent.com/jiuli12/Script/main/youth.js, requires-body=true
-----------------
QX 1.0. 7+ :
[task_local]
0 9 * * * https://raw.githubusercontent.com/jiuli12/Script/main/youth.js

#
[rewrite_remote]
https://raw.githubusercontent.com/jiuli12/Script/main/youth_getCookie.conf, tag=中青GetCookie, update-interval=86400, opt-parser=false, enabled=true

*/

let s = 200 //各数据接口延迟
const $ = new Env("中青看点");
let notifyInterval = 50; //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
let logs = true;
let  rotaryscore=0;
let doublerotary=0
let signresult; 
$.idx = ($.idx = ($.getval('zqSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
let COOKIES_SPLIT = "\n"; // 自定义多cookie之间连接的分隔符，默认为\n换行分割，不熟悉的不要改动和配置，为了兼容本地node执行


const YOUTH_HOST = "https://kd.youth.cn/WebApi/";
const notify = $.isNode() ? require('./sendNotify') : '';

const cookiesArr = [];
let signheaderVal = '';
const readArr = [];
let articlebodyVal ='';
const timeArr = [];
let timebodyVal = '';
const redpArr = [];
let redpbodyVal = '';
let detail = ``; 	
let CookieYouth = [];
let ARTBODYs = []; 
let REDBODYs  = [];
let READTIME = [];
let scoreNum= 0;

if ($.isNode()) {
	if (process.env.COOKIES_SPLIT) {
		COOKIES_SPLIT = process.env.COOKIES_SPLIT;
	}
	
	if (process.env.YOUTH_HEADER &&process.env.YOUTH_HEADER.indexOf(COOKIES_SPLIT) > -1) {
	    CookieYouth = process.env.YOUTH_HEADER.split(COOKIES_SPLIT);
	} else {
	    CookieYouth = process.env.YOUTH_HEADER.split();
	}
	
	if (process.env.YOUTH_ARTBODY &&process.env.YOUTH_ARTBODY.indexOf(COOKIES_SPLIT) > -1) {
	    ARTBODYs = process.env.YOUTH_ARTBODY.split(COOKIES_SPLIT);
	} else {
	    ARTBODYs = process.env.YOUTH_ARTBODY.split();
	}
	
	if (process.env.YOUTH_REDBODY &&process.env.YOUTH_REDBODY.indexOf(COOKIES_SPLIT) > -1) {
	    REDBODYs = process.env.YOUTH_REDBODY.split(COOKIES_SPLIT);
	} else {
	    REDBODYs = process.env.YOUTH_REDBODY.split();
	}

	if (process.env.YOUTH_TIME &&process.env.YOUTH_TIME.indexOf(COOKIES_SPLIT) > -1) {
	  READTIME = process.env.YOUTH_TIME.split(COOKIES_SPLIT);
	} else {
	  READTIME = process.env.YOUTH_TIME.split();
	}
}

if ($.isNode()) {
    Object.keys(CookieYouth).forEach((item) => {
        if (CookieYouth[item]) {
          cookiesArr.push(CookieYouth[item])
        }
      })
    Object.keys(ARTBODYs).forEach((item) => {
        if (ARTBODYs[item]) {
          readArr.push(ARTBODYs[item])
        }
      })
    Object.keys(REDBODYs).forEach((item) => {
        if (REDBODYs[item]) {
          redpArr.push(REDBODYs[item])
        }
      })
    Object.keys(READTIME).forEach((item) => {
        if (READTIME[item]) {
          timeArr.push(READTIME[item])
        }
      })
} else {
	cookiesArr.push($.getdata('youthheader_zq'));
	redpArr.push($.getdata('red_zq'));
	readArr.push($.getdata('read_zq'));
	timeArr.push($.getdata('readtime_zq'));
	// 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
	let zqCount = ($.getval('zqCount') || '1') - 0;
	for (let i = 2; i <= zqCount; i++) {
	  if ($.getdata(`youthheader_zq${i}`)) {
		  cookiesArr.push($.getdata(`youthheader_zq${i}`));
		  redpArr.push($.getdata(`red_zq${i}`));
		  readArr.push($.getdata(`read_zq${i}`));
		  timeArr.push($.getdata(`readtime_zq${i}`));
	  }
	}
}

const firstcheck = $.getdata('signt');
const runtimes = $.getdata('times');
const opboxtime = $.getdata('opbox');

function GetCookie() {
   if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/TaskCenter\/(sign|getSign)/)) {
   const signheaderVal = JSON.stringify($request.headers)
    if (signheaderVal)        $.setdata(signheaderVal,'youthheader_zq'+ $.idx)
    $.log(`[${$.name + $.idx}] 获取Cookie: 成功,signheaderVal: ${signheaderVal}`)
    $.msg($.name + $.idx, `获取Cookie: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/article\/complete/)) {
   const articlebodyVal = $request.body
    if (articlebodyVal)        $.setdata(articlebodyVal,'read_zq'+ $.idx)
    $.log(`[${$.name + $.idx}] 获取阅读: 成功,articlebodyVal: ${articlebodyVal}`)
    $.msg($.name + $.idx, `获取阅读请求: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/v5\/user\/app_stay/)) {
   const timebodyVal = $request.body
    if (timebodyVal)        $.setdata(timebodyVal,'readtime_zq'+ $.idx)
    $.log(`[${$.name + $.idx}] 获取阅读: 成功,timebodyVal: ${timebodyVal}`)
    $.msg($.name + $.idx, `获取阅读时长: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/article\/red_packet/)) {
   const redpbodyVal = $request.body
    if (redpbodyVal)        $.setdata(redpbodyVal, 'red_zq'+ $.idx)
    $.log(`[${$.name + $.idx}] 获取惊喜红包: 成功,redpbodyVal: ${redpbodyVal}`)
    $.msg($.name + $.idx, `获取惊喜红包请求: 成功🎉`, ``)
  }
 }


let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
  GetCookie()
} else {
  !(async () => {
    await all();
    await showmsg();
  })()
      .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
      })
      .finally(() => {
        $.done();
      })
}

async function all() {
		   
	if (!cookiesArr[0]) {
	    $.msg($.name , '【提示】请先获取${$.name}cookie');
	    return;
	}else{
	  console.log(`============ 共${cookiesArr.length}个${$.name}账号  =============\n`)
      console.log(`脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()} \n`)																											  																																																																												 
	  for (let i = 0; i < cookiesArr.length; i++) {
		     if (cookiesArr[i]) {
				signheaderVal = cookiesArr[i];
				articlebodyVal = readArr[i];
				timebodyVal = timeArr[i];
				redpbodyVal = redpArr[i];
				await sign();
				await signInfo(); 
			        await friendsign();
			        //八点之后开启报名打开
			        if($.time('HH')>=9){
			            await punchCard()
			        };
				if ($.isNode()&& $.time('HH')>20&&$.time('HH')<22){
				   await endCard();
				}else if ($.time('HH')>4&&$.time('HH')<8){
				   await endCard();
				}
				await SevCont();
				await comApp();
				await ArticleShare();
				await openbox();
				await getAdVideo();
				await gameVideo();
				await readArticle();
				await Articlered();
				await readTime();
				for ( k=0;k<5;k++){
					await $.wait(5000);
					await rotary();
					if (rotaryres.status == 0) {
					   rotarynum = ` 转盘${rotaryres.msg}🎉`;
					   break
					} else if(rotaryres.status == 1){
						rotaryscore += rotaryres.data.score
						rotarytimes = rotaryres.data.remainTurn
					}
					if (rotaryres.status == 1 && rotaryres.data.doubleNum !== 0) {
						await TurnDouble();
						if (Doubleres.status == 1) {
							doublerotary += Doubleres.data.score
						}
					}
				}
				if (rotaryres.status == 1) {
				 detail += `【转盘抽奖】+${rotaryscore}个青豆 剩余${rotaryres.data.remainTurn}次\n`
				}else{
					detail += `【转盘抽奖】已用完\n`
				}
				if (rotaryres.status !== 0&&rotaryres.data.doubleNum !== 0){
				 detail += `【转盘双倍】+${doublerotary}青豆 剩余${rotaryres.data.doubleNum}次\n`
				}else{
					detail += `【转盘双倍】已用完\n`
				}
				await rotaryCheck();
				await earningsInfo();
			   }
	   }
	  
	}
	 
}

function sign() {
    return new Promise((resolve, reject) => {
        const signurl = {
            url: 'https://kd.youth.cn/TaskCenter/sign',
            headers: JSON.parse(signheaderVal),
        }
        $.post(signurl, (error, response, data) => {
			try{
				signres = JSON.parse(data)
				const date =  $.time(`MMdd`)
				if (signres.status == 2) {
				    signresult = `签到失败，Cookie已失效‼️`;
				    $.msg($.name, signresult, "");
				    return;
				} else if (signres.status == 1) {
				     signresult = `【签到结果】成功 🎉 明日+${signres.nextScore} `
				    $.setdata(1,'times')
				  if(firstcheck==undefined||firstcheck!=date){
				    $.setdata(date,'signt');
				  }
				} else if (signres.status == 0) {
				  signresult = `【签到结果】已签到`;
				  if(runtimes!==undefined){
					$.setdata(`${parseInt(runtimes)+1}`,'times')  
				  }
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}
      
function signInfo() {
    return new Promise((resolve, reject) => {
        const infourl = {
            url: 'https://kd.youth.cn/TaskCenter/getSign',
            headers: JSON.parse(signheaderVal),
        }
        $.post(infourl, (error, response, data) => {
			  try {
				 signinfo = JSON.parse(data);
				 if (signinfo.status == 1) {
				     cash = signinfo.data.user.money
				 	detail += `\n============= 账号: ${signinfo.data.user.nickname}=============\n`;
				     detail += `【收益总计】${signinfo.data.user.score}青豆  现金约${cash}元\n`;
				     detail += `${signresult}(今天签到:+${signinfo.data.sign_score}青豆) 已连签${signinfo.data.sign_day}天`;
				     detail +='\n<本次收益>：\n'
				 } else {
				 	detail +=`获取用户失败请重新获取Cookie\n`;
				    detail += `失败原因：${signinfo.msg}\n`;
				 } 
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
        })
    })
}

function friendsign() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/WebApi/ShareSignNew/getFriendActiveList`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, async(error, response, data) => {
			try{
				let addsign = JSON.parse(data)
				if (addsign.error_code == "0"&& addsign.data.active_list.length>0) {
                                        scoreNum= 0;
					friendsitem = addsign.data.active_list
					for(friends of friendsitem){
						if(friends.button==1 || friends.button==3){
							await friendSign(friends.uid)
						}
					}
					detail +=`【好友签到】 共${friendsitem.length}个好友已签到，获得+${scoreNum}个青豆\n`
					
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
           
        })
    })
}


function friendSign(uid) {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/WebApi/ShareSignNew/sendScoreV2?friend_uid=${uid}`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, (error, response, data) => {
			try{
				friendres = JSON.parse(data)
				if (friendres.error_code == "0") {
					friendsDataitem = friendres.data;
					for(const friendsData of friendsDataitem){
						scoreNum += parseInt(friendsData.score);
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}

//开启打卡报名
function punchCard() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `${YOUTH_HOST}PunchCard/signUp?`,
            headers: JSON.parse(signheaderVal),
        }
        $.post(url, (error, response, data) => {
			try{ 
				punchcardstart = JSON.parse(data);
				if (punchcardstart.code == 1) {
				    detail += `【打卡报名】打卡报名${punchcardstart.msg} ✅ \n`;
				    $.log("每日报名打卡成功，报名时间:"+`${$.time('MM-dd HH:mm')}`)
				    resolve();
				} else {
					detail += `【打卡报名】${punchcardstart.msg}\n`
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}

//结束打卡
function endCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
              url: `${YOUTH_HOST}PunchCard/doCard?`,headers: JSON.parse(signheaderVal),
            }
            $.post(url,async(error, response, data) => {
				try{
					punchcardend = JSON.parse(data)
					if (punchcardend.code == 1) {
					   detail += `【早起打卡】${punchcardend.data.card_time}${punchcardend.msg}✅\n`
					   $.log("早起打卡成功，打卡时间:"+`${punchcardend.data.card_time}`)
					   await Cardshare();
					} else if (punchcardend.code == 0) {
					   detail += `【早起打卡】${punchcardend.msg}\n`
					}
				} catch (e) {
					$.logErr(e, resp)
				} finally {
					resolve();
				}
            })
        },s)
    })
}
//打卡分享
function Cardshare() {
    return new Promise((resolve, reject) => {
        const starturl = {
            url: `${YOUTH_HOST}PunchCard/shareStart?`,
            headers: JSON.parse(signheaderVal),
        }
        $.post(starturl, (error, response, data) => {
			try{
				sharestart = JSON.parse(data)
				if (sharestart.code == 1) {
					setTimeout(() => {
						console.log(进来了);
						let endurl = {
							url: `${YOUTH_HOST}PunchCard/shareEnd?`,
							headers: JSON.parse(signheaderVal)
						}
						$.post(endurl, (error, response, data) => {
							try{ 
								console.log(data);
								shareres = JSON.parse(data)
								if (shareres.code == 1) {
									detail += `【打卡分享】已分享获得+${shareres.data.score}青豆\n`
								} else {
									detail += `【打卡分享】${shareres.msg}\n`
								}
							} catch (e) {
								$.logErr(e, resp)
							} finally {
								resolve();
							}
						})
					  },s*2);
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
          
        })
    })
}

function SevCont() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $.post({url: `${YOUTH_HOST}PunchCard/luckdraw?`,
              headers: JSON.parse(signheaderVal),
            }, async(error, response, data) => {
				try{ 
					sevres = JSON.parse(data)
					if (sevres.code == 1) {
					    detail += `【七日签到】+${sevres.data.score}青豆 \n`
					}else if (sevres.code == 0){
						detail += `【七日签到】未签到七天，${sevres.msg} \n`
					}
				} catch (e) {
					$.logErr(e, resp)
				} finally {
					resolve();
				}
            })
        },s)
    })
}


function comApp() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/mission/msgRed.json`,
            headers: {
            'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)'
            },
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
			try { 
				redres = JSON.parse(data)
				if (redres.success == true) {
				    detail += `【回访奖励】+${redres.items.score}个青豆\n`
				}else{
				    if(redres.error_code == "100009"){
				       detail += `【回访奖励】没有可领取的奖励\n`
				    }
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}

//分享文章
function ArticleShare() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `https://focu.youth.cn/article/s?signature=0Z3Jgv96wqmVPeM7obRdNpHXgAmRhxNPJ6y4jpGDnANbo8KXQr&uid=46308484&phone_code=26170a068d9b9563e7028f197c8a4a2b&scid=33007686&time=1602937887&app_version=1.7.8&sign=d21dd80d0c6563f6f810dd76d7e0aef2`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, async(error, response, data) => {
                resolve()
            })
        },s)
    })
}


//开启时段宝箱
function openbox() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `${YOUTH_HOST}invite/openHourRed`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, async(error, response, data) => {
				try{
					boxres = JSON.parse(data)
					if (boxres.code == 1) {
					  boxretime = boxres.data.time
					  $.setdata(boxretime, 'opbox')
					    detail += `【开启宝箱】+${boxres.data.score}青豆 下次奖励${boxres.data.time / 60}分钟\n`
					      await boxshare();
					}else{
					    detail += `【开启宝箱】${boxres.msg}\n`
					}
				} catch (e) {
					$.logErr(e, resp)
				} finally {
					resolve();
				}
            })
        },s)
    })
}

//宝箱分享
function boxshare() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `${YOUTH_HOST}invite/shareEnd`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, (error, response, data) => {
			   try{
				  shareres = JSON.parse(data)
				  if (shareres.code == 1) {
				      detail += `【宝箱分享】+${shareres.data.score}青豆\n`
				  }else{
				      detail += `【宝箱分享】${shareres.msg}\n`
				  } 
			   } catch (e) {
				$.logErr(e, resp)
			   } finally {
				resolve();
			   }
            })
        },s*2);
    })
}




//看视频奖励
function getAdVideo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/taskCenter/getAdVideoReward`,
            headers: JSON.parse(signheaderVal),
            body: 'type=taskCenter'
        }
        $.post(url, (error, response, data) => {
			try{ 
				adVideores = JSON.parse(data)
				if (adVideores.status == 1) {
				    detail += `【观看视频】+${adVideores.score}个青豆\n`
				}else{
					  detail += `【观看视频】+0个青豆\n`
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}
// 激励视频奖励
function gameVideo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/Game/GameVideoReward.json`,
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
			try{
				gameres = JSON.parse(data)
				if (gameres.success == true) {
					detail += `【激励视频】${gameres.items.score}\n`
				}else{
					if(gameres.error_code == "10003"){
						detail += `【激励视频】${gameres.message}\n`
					}
				}
            } catch (e) {
            	$.logErr(e, resp)
            } finally {
            	resolve();
            }
        })
    })
}


//阅读奖励
function readArticle() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/article/complete.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
			try{
				readres = JSON.parse(data);
				if (typeof readres.items.read_score === 'number')  {
					if(readres.items.read_score == 0){
						detail += `【阅读奖励】看太久了，换1篇试试\n`;
					}else{
						detail += `【阅读奖励】+${readres.items.read_score}个青豆\n`;
					}
				   
				} else{
					detail += `【阅读奖励】看太久了，换1篇试试\n`;
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
        })
    })
}
//惊喜红包
function Articlered() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/article/red_packet.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: redpbodyVal,
        }
        $.post(url, (error, response, data) => {
            redres = JSON.parse(data)
            if (redres.success == true) {
                detail += `【惊喜红包】+${redres.items.score}个青豆\n`
            }else{
                if(redres.error_code == "100001"){
                   detail += `【惊喜红包】${redres.message}\n`
                }
            }
            resolve()
        })
    })
}

function readTime() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/user/stay.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: timebodyVal,
         }
        $.post(url, (error, response, data) => {
            let timeres = JSON.parse(data)
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60
                detail += `【阅读时长】共计` + Math.floor(readtimes) + `分钟\n`
            } else {
                if (timeres.error_code == 200001) {
                    detail += `【阅读时长】❎ 未获取阅读时长Cookie\n`
                }else{
                    detail += `【阅读时长】❎ ${timeres.msg}\n`
					$.log(`阅读时长统计失败，原因:${timeres.msg}`)
                }
            }
            resolve()
        })
    })
}

//转盘任务
function rotary() {
   const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const time = new Date().getTime()
            const url = {
                url: `${YOUTH_HOST}RotaryTable/turnRotary?_=${time}`,
                headers: JSON.parse(signheaderVal),
                body: rotarbody
            }
            $.post(url,async (error, response, data) => {
                try{
                      rotaryres = JSON.parse(data)
                     } catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
            })
        }, s);
    })
}

//转盘宝箱判断
function rotaryCheck() {
    return new Promise(async(resolve) => {
        if (rotaryres.code == 10010) {
            return resolve();
        }
        let i = 0;
        while (i <= 3) {
            if (100 - rotaryres.data.remainTurn == rotaryres.data.chestOpen[i].times) {
                await runRotary(i + 1)
            }
            i++;
        }
      resolve();
    })
}

//开启宝箱
function runRotary(index) {
    return new Promise((resolve, reject) => {
        const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8] + '&num=' + index;
        const time = new Date().getTime();
        const url = {
            url: `${YOUTH_HOST}RotaryTable/chestReward?_=${time}`,
            headers: JSON.parse(signheaderVal),
            body: rotarbody
        }
        $.post(url, (error, response, data) => {
        const rotaryresp = JSON.parse(data);
            if (rotaryresp.status == 1) {
                detail += `【转盘宝箱${index}】+${rotaryresp.data.score}个青豆\n`;
            }else{
                if(rotaryresp.code == "10010"){
                    detail += `【转盘宝箱${index}】+今日抽奖完成\n`;
                }
            }
            resolve();
        })
    })
}

//转盘双倍奖励
function TurnDouble() {
    const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let time = (new Date()).getTime()
            const url = {
                url: `${YOUTH_HOST}RotaryTable/toTurnDouble?_=${time}`,headers: JSON.parse(signheaderVal),body: rotarbody}
            $.post(url, (error, response, data) => { 
              try{
                Doubleres = JSON.parse(data)
                     } catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
             resolve()
            })
        },s)
    })
}
function earningsInfo() {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `https://kd.youth.cn/wap/user/balance?${JSON.parse(signheaderVal)['Referer'].split("?")[1]}`,
                headers: JSON.parse(signheaderVal),
            }
        $.get(url, (error, response, data) => {
              infores = JSON.parse(data)
                if (infores.status == 0) {
                    detail += `<收益统计>：\n`
                    for (i = 0; i < infores.history[0].group.length; i++) {
                        detail += '【' + infores.history[0].group[i].name + '】' + infores.history[0].group[i].money + '个青豆\n'
                    }
                    detail += '<今日合计>： ' + infores.history[0].score + " 青豆"
                }
                resolve()
            })
        },s)
    })
}
async function showmsg() {
        if (rotaryres.status == 1 && rotarytimes >= 97) {
        	$.msg($.name, '', detail)  //默认前三次为通知
        }else if (rotaryres.status == 1 && rotarytimes % notifyInterval == 0) {
        	$.msg($.name, '', detail) //转盘次数/间隔整除时通知;
        }else if (rotaryres.code == 10010 && notifyInterval != 0) {
        	 $.msg($.name, '', detail)//任务全部完成且通知间隔不为0时通知;
        }else {
       		console.log(detail)
   	}
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
