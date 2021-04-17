auto.waitFor();
let see_count=180;//rawInput('请输入滑动次数', '180');;
app.launchApp('七猫免费小说');
sleep(10000);
console.show(); //开启日志（悬浮窗权限）
let bookList = className("android.widget.LinearLayout").find();
if (bookList != null) {
    bookList[2].click();
}
sleep(5000);
for (var i = 1; i <= see_count; i++) {
    toast("七猫免费小说滑动" + i + "次" + "总计:" + see_count + "次");
    console.log("七猫免费小说滑动" + i + "次" + "总计:" + see_count + "次");
    swipe(750, 120, 100, 120, 100);
    let delayTime = random(15000, 20000);
    sleep(delayTime);
}