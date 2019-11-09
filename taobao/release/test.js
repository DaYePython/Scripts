
var view = "android.view.View";

function rectClick(obj) {
    click(obj.left, obj.top, obj.right, obj.bottom);
}

function signFor(tar) {
    var obj = findComponent(view, "", tar, "", "");
    if (obj.exists()) {
        log("状态：执行" + tar);
        rectClick(obj.findOne().bounds());
        sleep(2000);
    }
}

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

function test(){
    var edit = idContains('searchEdit').findOne();
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
    
    var sPre = "https://market.m.taobao.com/app/tb-source-app/campaign/pages/index?wh_weex=true";
    var search = text("搜索").findOne();
    for (var i = 0; i < stores.length; i++) {
        log("准备：签到" + (i + 1) + "个店铺");
        edit.setText(sPre + stores[i]);
        sleep(500);
        search.click();
        log("状态：正在进入" + (i + 1) + "个店铺");
        sleep(5000);
        signFor("签到领喵币");
        back();
        sleep(1500);
        findComponent("android.widget.TextView", "", "清空搜索框中内容", "", true).findOne().click();
    }
}

console.show()

log("请在搜索页测试")
test()