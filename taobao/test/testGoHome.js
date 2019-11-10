function goHome(appHome) {
    log("设备：缓冲耗时1.5s");
    sleep(1500);
    while (currentActivity() != appHome) {
        log("状态：进入主界面中..");
        back();
        sleep(2500);
        log(currentActivity())
    }
}

console.show()
goHome("com.taobao.tao.TBMainActivity")