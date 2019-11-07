var app = "com.taobao.taobao";
var home = "com.taobao.tao.TBMainActivity";
var act = "com.taobao.browser.BrowserActivity";
var actCom = "android.widget.FrameLayout";
var actDepth = 3;
var actIndexInParent = 1;
var taskBtn = "android.widget.Button";
var taskDepth = 14;
var taskIndexInParent = 5;
var view = "android.view.View";
var editText = "android.widget.EditText";
var editDepth = 2;
var editIndexInParent = 0;
var homeBtn = actCom;
var homeDepth = 3;
var homeIndexInParent = 0;
var confFile = files.getSdcardPath() + "/喵币定制/" + device.model + "_" + device.release + ".conf";
var swiperMinVersion = 7.0;
var time = 0;


function findComponent(cls, depth, desc, indexInParent, clickable) {
    var obj = className(cls);
    if (depth != "") {
        obj = obj.depth(depth);
    }
    if (desc != "") {
        obj = obj.descContains(desc);
    }
    if (indexInParent != "") {
        obj = obj.indexInParent(indexInParent);
    }
    if (clickable != "") {
        obj = obj.clickable(clickable);
    }
    return obj;
}

function isHome() {
    /* 底栏第0个按钮有两个功能
    * 1. 跳转至猜你喜欢
    * 2. 跳转至首页
    * 3. 二者相互切换
    */
    if (currentActivity() == home) {
        var hBtn = findComponent(homeBtn, "", "首页", "", true).selected(false);
        if(hBtn.exists()){
            log("状态：进入主页首页");
            hBtn.findOne().click();
            sleep(1000);
        }
        var hTitle = text("首页").selected(false);
        if(hTitle.exists()){
            log("状态：进入首页主页");
            hTitle.findOne().click();
            sleep(500);
        }
        
        log(findComponent("android.widget.ImageView", "", "首页", "", false).exists());
        
        if(findComponent("android.widget.ImageView", "", "首页", "", false).exists()){
            findComponent(homeBtn, 3, "", 0, true).findOne(2000).click();
        } 
        if (!findComponent("android.widget.ImageView", "", "猜你喜欢", "", false).exists()) {
            findComponent(homeBtn, 3, "", 0, true).findOne(2000).click();
        }
        sleep(1000);
		return true;
    }
	return false;
}

function goHome(appHome) {
    log("设备：缓冲耗时1.5s");
    sleep(1500);
    while (currentActivity() !== appHome) {
        log("状态：进入主界面中..");
        back();
        sleep(2500);
    }
	isHome();
}

auto.waitFor();
console.show();
log(currentActivity())
log(home)
log(isHome());
goHome(home);
// log(isHome());
// findComponent("android.widget.ImageView", "", "猜你喜欢", "", false).parent()