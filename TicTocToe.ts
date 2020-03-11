class Game{
    static x_list:Array<number> = []
    static o_list:Array<number> = []
    static player1Turn:boolean = true
    static totalBox:number = 0
    constructor(){
    }

    static checkStatus(player:string, size:number){
        this.totalBox+=1
        let playerBoxList
        if(player== 'X')
            playerBoxList = this.x_list
        else
            playerBoxList = this.o_list
        playerBoxList.sort(function(a,b){return a-b})
        if((playerBoxList.length)>=size){
            if(this.checkRow(playerBoxList, size) || this.checkColumn(playerBoxList, size) || this.checkFrontDiagonal(playerBoxList, size) || this.checkBackDiagonal(playerBoxList, size)){
                alert(`${player} is the winner`)
                this.reset()
            }
            else{
                if(this.totalBox===size*size)
                alert("Match Drawn")
            }
        }

    }

    static checkRow(playerBoxList:Array<number>, val:number):boolean{
        console.log("checkRow")
        for(let i=1;i<=(val*val)-val+1;i=i+val){
            let k
            let present:boolean = true;
            console.log("yeah")
            console.log(i+val-1)
            for(k=i;k<=i+val-1;k++){
                console.log(k," ",playerBoxList.indexOf(k))
                if(playerBoxList.indexOf(k)!==-1)
                continue
                else{
                    present = false
                    break
                }
            }
            if(present)
                return true
        }
        return false
    }

    static checkColumn(playerBoxList:Array<number>, val:number):boolean{
        console.log("checkColumn")
        for(let i=1;i<=val;i=i+1){
            let k
            let present:boolean = true;
            for(k=i;k<val*val;k=k+val){
                console.log(k," ",playerBoxList.indexOf(k))
                if(playerBoxList.indexOf(k)!==-1)
                continue
                else{
                    present = false
                    break
                }
            }
            if(present)
                return true
        }
        return false 
    }

    static checkFrontDiagonal(playerBoxList:Array<number>, val:number):boolean{
        console.log("checkFrontDiagonal")
        for(let i=1;i<=val*val;i=i+val+1){
            console.log(i," ",playerBoxList.indexOf(i))
            if(playerBoxList.indexOf(i)!=-1)
            continue
            else{
                return false
            }
        }
        return true   
    }

    static checkBackDiagonal(playerBoxList:Array<number>, val:number):boolean{
        console.log("checkBackDiagonal")
        for(let i=val; i<=(val*val)-val+1; i=i+val-1){
            console.log(i," ",playerBoxList.indexOf(i))
            if(playerBoxList.indexOf(i)!=-1)
            continue
            else{
                return false
            }
        }
        return true
    }

    static reset(){
        for(let i=1;i<=size*size;i++)
        (<HTMLInputElement>document.getElementById(i.toString())).innerHTML=""
    }
}

class Box{
    boxId:number
    active:boolean = false
    constructor(BoxId:number, size:number){
        this.boxId = BoxId
        let box = document.createElement('div')
        box.style.width = '100px'
        box.style.height = '100px'
        box.style.display = 'inline-block'
        box.style.backgroundColor = 'yellow'
        box.style.verticalAlign = 'top'
        box.style.textAlign = 'center'
        box.style.border =  'thick solid #0000FF'
        box.id = BoxId.toString()
        box.innerHTML = ""
        document.body.appendChild(box)
        box.onclick = () =>{
            if(!this.active){
                if(Game.player1Turn){
                    (<HTMLInputElement>document.getElementById(box.id)).innerHTML = 'X'
                    Game.player1Turn = false
                    Game.x_list.push(BoxId)
                    Game.checkStatus('X', size)
                }
                else{
                    (<HTMLInputElement>document.getElementById(box.id)).innerHTML = 'O'
                    Game.player1Turn = true
                    Game.o_list.push(BoxId)
                    Game.checkStatus('O', size)
                }
                this.active = true
            }
            else{
                alert("please select the Empty box")
            }
           // Game.x_list.push(this.boxId.toString())
            //console.log(Game.x_list)
        }
    }

}

let size = 5
for(let i=1;i<=size*size;i++){
    let br = document.createElement('br')
    new Box(i, size)
    if(i%size==0){
        document.body.appendChild(br)
    }
}
