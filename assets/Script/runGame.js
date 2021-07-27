// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        boxPrefab : cc.Prefab,
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
        var height = 460 - (level-1)*11;
        var r = Math.floor(Math.random() * 255);  
        var g = Math.floor(Math.random() * 255);    
        var b = Math.floor(Math.random() * 255);
        for (let index = 0; index < level ** 2; index++) {
            let boxNode = cc.instantiate(this.boxPrefab);
            this.boxFrameNode.addChild(boxNode);
            boxNode.width = width/level ;
            boxNode.height = height/level ;
            boxNode.color = cc.Color(r,g,b);
            this.boxArr.push(boxNode);
        }
        
        console.log(this.boxArr);

        let ansBoxNum = Math.floor(Math.random() * (level ** 2));
        let ans = this.boxArr[ansBoxNum];
        console.log(ansBoxNum+"答案");
        ans.opacity = opacityValue ;
        ans.on(cc.Node.EventType.TOUCH_START,function(){this.ansClick(level,opacityValue)},this);
    },

    ansClick (level,opacityValue) {
        console.log(level+"level");
        for (let index = 0; index < level ** 2; index++) {
            this.boxArr[index].destroy();
        }
        this.boxArr = [] ;
        console.log('123');
        level ++  ;
        opacityValue += 5 ; 
        if(level == 10){
            cc.director.loadScene("endGame");
        }else{
            this.runGame(level,opacityValue);
        }
        
    },

    onLoad () {
        this.init();
    },
});
