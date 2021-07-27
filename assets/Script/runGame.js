// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        boxPrefab : cc.Prefab, //關聯相關屬性
        boxFrameNode : cc.Node,
    },

    // 初始化
    init(){        
        var level = 1;
        var opacityValue = 155;
        this.boxArr = [] ;
        this.runGame(level,opacityValue);
    },

    // 執行遊戲帶入關卡等級以及透明值
    runGame (level,opacityValue) {        
        var width = 460 - (level-1)*11;
        var height = 460 - (level-1)*11; //設定寬高減掉間距
        var r = Math.floor(Math.random() * 255);  //設定隨機顏色
        var g = Math.floor(Math.random() * 255);    
        var b = Math.floor(Math.random() * 255);
        for (let index = 0; index < level ** 2; index++) {  // 利用迴圈製做相對等級數量方塊
            let boxNode = cc.instantiate(this.boxPrefab);  //實作預製物件 顏色方塊
            this.boxFrameNode.addChild(boxNode); //再父層新顏色方塊物件
            boxNode.width = width/level ;        //設定相對等級的長寬以及隨機顏色
            boxNode.height = height/level ;
            boxNode.color = cc.Color(r,g,b);
            this.boxArr.push(boxNode);  //將方塊物件放進陣列
        }
        
        console.log(this.boxArr);

        let ansBoxNum = Math.floor(Math.random() * (level ** 2));  //設置在等級內隨機號碼
        let ans = this.boxArr[ansBoxNum];                          //將答案指定為陣列裡隨機的一個方塊
        console.log(ansBoxNum+"答案");
        ans.opacity = opacityValue ;                               //設定答案透明值
        ans.on(cc.Node.EventType.TOUCH_START,function(){this.ansClick(level,opacityValue)},this); 
        //在答案方塊上添加點擊事件並執行 ansClick 函式
    },

    ansClick (level,opacityValue) {
        console.log(level+"level");
        //利用迴圈清除上一個等級的顏色方塊
        for (let index = 0; index < level ** 2; index++) {
            this.boxArr[index].destroy();
        }
        this.boxArr = [] ; //初始化陣列
        console.log('123');
        level ++  ;          //等級 +1 以及透明值 +5
        opacityValue += 5 ; 
        //若等級達10擊通過轉場否則跑下一個等級的頁面
        if(level == 10){
            cc.director.loadScene("endGame");
        }else{
            this.runGame(level,opacityValue);
        }
        
    },
    //載入後初始化
    onLoad () {
        this.init();
    },
});
