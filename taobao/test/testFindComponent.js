/*
 * @Description: 
 * @Author: daye
 * @Date: 2019-11-10 08:15:40
 * @LastEditTime: 2019-11-10 23:45:57
 * @LastEditors: daye
 */
function findComponent(id, text, desc, clickable) {
    if (id) {
        obj = idContains(id);
    }
    if (desc) {
        obj = descContains(desc);
    }
    if (text) {
        obj = textContains(text);
    }
    if (clickable && obj) {
        obj = clickable(clickable);
    }
    log(obj)
    return obj;
}

function test(){
    findComponent(id="testId");
    findComponent(test="testText")
    findComponent(desc="textDesc")
    findComponent(clickable=false)
}

console.show()
test()