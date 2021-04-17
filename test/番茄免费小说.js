auto.waitFor();
let see_count=180;//rawInput('请输入滑动次数', '180');;
app.launchApp('番茄免费小说');
sleep(10000);
console.show(); //开启日志（悬浮窗权限）
console.setSize(device.width , device.height / 4);
try {
    if (className("android.widget.RadioButton").id('in').exists()) {
        let bookshelf = className("android.widget.RadioButton").id('in').findOnce();
        bookshelf.click();
        sleep(2000);
        let booklist = className('android.view.ViewGroup').find();//查找到的所有ViewGroup
        if (booklist != null) {
            booklist[1].click();//第一本书的ViewGroup
        }
    }
} catch (e) { }
sleep(10000);
for (var i = 0; i < see_count; i++) {
    toast("番茄免费小说滑动" + i + "次" + "总计:" + see_count + "次");
    console.log("番茄免费小说滑动" + i + "次" + "总计:" + see_count + "次");
    pressTime = random(250, 600);
    swipe(750, 1000, 100, 1000, pressTime);
    delayTime = random(15000, 20000);
    sleep(delayTime);
}
home();