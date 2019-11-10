
var taobao = "com.taobao.taobao";
var home = "com.taobao.tao.TBMainActivity";
var act = "com.taobao.browser.BrowserActivity";

var view = "android.view.View";

var searchEditId = "searchEdit"
var actDesc = "捉猫猫"
var taskText = "领喵币"

var swiperMinVersion = 7.0;
var time = 0;
var total = 0;
var stores = ["&userId=2089100916&shopId=111481369&pathInfo=/campaign-10827-88.htm#tq",
    "&userId=1035757927&shopId=73516010&pathInfo=/campaign-10827-113.htm#tq",
    "&userId=519286239&shopId=62832501&pathInfo=/campaign-10827-128.htm#tq",
    "&userId=3079263591&shopId=289321551&pathInfo=/campaign-10827-92.htm#tq",
    "&userId=2374579403&shopId=116386742&pathInfo=/campaign-10827-79.htm#tq",
    "&userId=2838892713&shopId=150920153&pathInfo=/campaign-10827-142.htm#tq",
    "&userId=2360209412&shopId=115862174&pathInfo=/campaign-10827-105.htm#tq",
    "&userId=201749140&shopId=57616696&pathInfo=/campaign-10827-117.htm#tq",
    "&userId=134363478&shopId=57301407&pathInfo=/campaign-10827-248.htm#tq",
    "&userId=92688455&shopId=57299736&pathInfo=/campaign-10827-148.htm#tq",
    "&userId=1790973264&shopId=106746477&pathInfo=/campaign-10827-85.htm#tq",
    "&userId=890482188&shopId=71955116&pathInfo=/campaign-10827-125.htm#tq",
    "&userId=749391658&shopId=68491548&pathInfo=/campaign-10827-127.htm#tq",
    "&userId=1114511827&shopId=101717810&pathInfo=/campaign-10827-144.htm#tq",
    "&userId=917264765&shopId=72571314&pathInfo=/campaign-10827-100.htm#tq",
    "&userId=160586276&shopId=57301770&pathInfo=/campaign-10827-75.htm#tq",
    "&userId=1714128138&shopId=104736810&pathInfo=/campaign-10827-276.htm#tq",
    "&userId=2228361831&shopId=113462750&pathInfo=/campaign-10827-511.htm#tq",
    "&userId=3164711246&shopId=306660112&pathInfo=/campaign-10827-61.htm#tq",
    "&userId=901409638&shopId=72217984&pathInfo=/campaign-10827-91.htm#tq",
    "&userId=3626596873&shopId=471050084&pathInfo=/campaign-10827-46.htm#tq",
    "&userId=3527212490&shopId=434208197&pathInfo=/campaign-10827-47.htm#tq",
    "&userId=533497499&shopId=62941831&pathInfo=/campaign-10827-111.htm#tq",
    "&userId=883737303&shopId=71799145&pathInfo=/campaign-10827-107.htm#tq",
    "&userId=2957642769&shopId=329012182&pathInfo=/campaign-10827-46.htm#tq",
    "&userId=2064892827&shopId=110224300&pathInfo=/campaign-10827-107.htm#tq",
    "&userId=446338500&shopId=62147762&pathInfo=/campaign-10827-171.htm#tq",
    "&userId=470168984&shopId=62377409&pathInfo=/campaign-10827-130.htm#tq",
    "&userId=1652554937&shopId=103715363&pathInfo=/campaign-10827-106.htm#tq",
    "&userId=217101303&shopId=57895461&pathInfo=/campaign-10827-499.htm#tq",
    "&userId=158748311&shopId=57301762&pathInfo=/campaign-10827-285.htm#tq"
];

function interval() {
    day = time * 1.0 / 3600000;
    return (day > 3);
}

function loadApp(appName) {
    log("欢迎使用喵币自动收获脚本");
    log("作者：Rukawalee");
    log("github.com/Rukawalee/Scripts");
    sleep(3000);
    log("设备：设置常亮");
    device.keepScreenOn();
    log("运行：手机淘宝");
    launch(appName);
    log("准备：手机淘宝主界面..");
    goHome(home);
}

function goHome(appHome) {
    log("设备：缓冲耗时1.5s");
    sleep(1500);
    while (currentActivity() != appHome) {
        log("状态：进入主界面中..");
        back();
        sleep(2500);
    }
    isHome();
}

function goAct() {
    sleep(1500);
    log("状态：查找活动入口组件..");
    let actIn = descContains(actDesc).findOne(8000);
    if (actIn) {
        log("状态：进入活动页面中..");
        log("提示：如进错页面，请检查组件");
        actIn.click();
    } else {
        log("提示：请手动进入活动页面");
    }
    var subThread = timeout(8000, currentActivity(), "组件{领喵喵}不可见，请手动进入活动页");
    textContains(taskText).waitFor();
    subThread.interrupt();
    log("状态：已进入活动页面");
}

function collectCoin(tar) {
    var obj = textContains(tar);
    if (obj.exists()) {
        log("准备：领取" + tar + "金币");
        sleep(500);
        rectClick(obj.findOne().bounds());
        log("状态：金币领取成功");
        sleep(1000);
    }
}

function collectDouble() {
    collectCoin("上限");
    sleep(1000);
    if (text("翻倍领取").exists()) {
        log("准备：金币翻倍领取");
        doTask("翻倍领取");
    }
}

function doTask(tar) {
    var obj = text(tar);
    while (obj.exists()) {
        log("状态：正在执行" + tar);
        var bust = textContains("英特尔").exists();
        obj.findOne().click();
        switch (tar) {
            case "翻倍领取":
                wait(24, descContains("观看完成"));
                break;
            case "去查看":
                wait(8, descContains(""));
                break;
            case "去浏览":
            case "去进店":
                if (device.release >= swiperMinVersion) {
                    sleep(2000);
                    swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 1000);
                    sleep(1000);
                    swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 1000);
                }
                bust ? textContains("campaign-10827-97").findOne().click() : "";
                wait(26, textContains("已获得"),
                    textContains("已达上限"),
                    textContains("任务完成"),
                    textContains("任务已完成"),
                    descContains("已获得"),
                    descContains("已达上限"),
                    descContains("任务完成"),
                    descContains("任务已完成"));
                signFor("签到领喵币");
                bust ? back() : "";
                if (isHome()) {
                    log("准备：重新进入活动页");
                    goAct();
                    log("准备：执行活动任务..");
                }
                break;
            default:
                sleep(23000);
                break;
        }
        log("状态：完成一个任务");
        if (currentActivity() != act) {
            back();
            log("状态：缓冲耗时3s");
            sleep(3000);
        }
    }
}

function isHome() {
    return currentActivity() == home;
}

function sign(tar) {
    var obj = text(tar);
    while (obj.exists()) {
        log("状态：正在执行" + tar);
        sleep(1000);
        obj.findOne().click();
        if (tar == "去签到") {
            var inSign = descContains("马上签到").findOne(10000);
            if (inSign != null) {
                inSign.click();
            } else {
                inSign = textContains("去完成").findOne(4000);
                if (inSign != null) {
                    inSign.click();
                    sleep(3000);
                    inSign = text("签到").findOne(4000);
                    if (inSign != null) {
                        inSign.click();
                    }
                }
            }
            sleep(1000);
            log("准备：返回活动页..");
            back();
        }
        log("状态：完成" + tar);
        sleep(3500);
    }
}

function signFor(tar) {
    var obj = descContains(tar);
    if (obj.exists()) {
        log("状态：执行" + tar);
        rectClick(obj.findOne().bounds());
        sleep(2000);
    }
}

function goStore() {
    goHome(home);
    log("设备：缓冲耗时2s");
    sleep(2000);
    rectClick(descContains("搜索").findOne().bounds());
    log("准备：查找搜索框..");
    sleep(3000);
    let edit = idContains(id=searchEditId).findOne(8000);
    if (edit) {
        let sPre = "https://market.m.taobao.com/app/tb-source-app/campaign/pages/index?wh_weex=true";
        let search = text("搜索").findOne();
        for (let i = 0; i < stores.length; i++) {
            log("准备：签到" + (i + 1) + "个店铺");
            edit.setText(sPre + stores[i]);
            sleep(500);
            search.click();
            log("状态：正在进入" + (i + 1) + "个店铺");
            sleep(5000);
            signFor("签到领喵币");
            back();
            sleep(1500);
            descContains("清空搜索框中内容").findOne().click();
        }
    }
}

function rectClick(obj) {
    click(obj.left, obj.top, obj.right, obj.bottom);
}

function wait(limit) {
    log("状态：预估任务完成" + limit + "s");
    var condition = true;
    while (limit > 0 && condition) {
        sleep(2000);
        limit -= 2;
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i].exists()) {
                condition = false;
                break;
            }
        }
        log("状态：活动耗时2s，预估还需" + limit + "s");
    }
}

function sudden() {
    sleep(1000);
    var obj = text("关闭");
    if (textContains("收下去盖楼").exists() && obj.exists()) {
        log("状态：意外情况，已进行处理");
        obj.findOne().click();
    }
}

function toCollect() {
    sudden();
    log("准备：执行活动任务..");
    let tBtn = textContains(taskText).findOne(8000);
    if (tBtn) {
        tBtn.click();
        sleep(3000);
        log("准备：执行签到");
        sign("签到");
        log("准备：执行去浏览");
        doTask("去浏览");
        log("准备：执行去查看");
        doTask("去查看");
        log("准备：执行去进店");
        doTask("去进店");
        log("准备：执行去签到");
        sign("去签到");
        log("准备：执行去浏览");
        doTask("去浏览");
        log("准备：执行店铺签到");
    }
    goStore();
}

function timeout(limit, active, tip) {
    return threads.start(function() {
        var id = setInterval(function() {
            if (currentActivity() == active) {
                log("等待超时，" + tip);
                notify();
            } else {
                clearInterval(id);
            }
        }, limit)
    });
}

function notify() {
    let times = 3;
    while (times-- > 1) {
        device.vibrate(30 + times * 6);
        sleep(128);
    }
}

function over() {
    log("设备：取消常亮");
    device.cancelKeepingAwake();
    log("状态：任务完成");
    log("提示：如任务未完成，请多次尝试！");
    log("提示：完成所有任务时间" + (total / 60).toFixed(2) + "分钟");
    exit();
}

function main() {
    setInterval(function() {
        total += 1;
    }, 1000);
    
    console.show();
    loadApp(taobao);
    goAct();
    toCollect();
    notify();
    over();
}

auto.waitFor();
main();