auto();
var appName=rawInput("","抖音极速版");
launchApp("抖音极速版");
sleep("8000");
setScreenMetrics(1080,1920);
sleep("3000")
var num=3;
while(num>1){       
    sleep(1000);
    swipe(device.width/2,1300,device.width/2,300,2000);
    sleep(10000);
}