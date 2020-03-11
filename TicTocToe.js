var Game = /** @class */ (function () {
    function Game() {
    }
    Game.checkStatus = function (player, size) {
        this.totalBox += 1;
        var playerBoxList;
        if (player == 'X')
            playerBoxList = this.x_list;
        else
            playerBoxList = this.o_list;
        playerBoxList.sort(function (a, b) { return a - b; });
        if ((playerBoxList.length) >= size) {
            if (this.checkRow(playerBoxList, size) || this.checkColumn(playerBoxList, size) || this.checkFrontDiagonal(playerBoxList, size) || this.checkBackDiagonal(playerBoxList, size)) {
                alert(player + " is the winner");
                this.reset();
            }
            else {
                if (this.totalBox === size * size)
                    alert("Match Drawn");
            }
        }
    };
    Game.checkRow = function (playerBoxList, val) {
        console.log("checkRow");
        for (var i = 1; i <= (val * val) - val + 1; i = i + val) {
            var k = void 0;
            var present = true;
            console.log("yeah");
            console.log(i + val - 1);
            for (k = i; k <= i + val - 1; k++) {
                console.log(k, " ", playerBoxList.indexOf(k));
                if (playerBoxList.indexOf(k) !== -1)
                    continue;
                else {
                    present = false;
                    break;
                }
            }
            if (present)
                return true;
        }
        return false;
    };
    Game.checkColumn = function (playerBoxList, val) {
        console.log("checkColumn");
        for (var i = 1; i <= val; i = i + 1) {
            var k = void 0;
            var present = true;
            for (k = i; k < val * val; k = k + val) {
                console.log(k, " ", playerBoxList.indexOf(k));
                if (playerBoxList.indexOf(k) !== -1)
                    continue;
                else {
                    present = false;
                    break;
                }
            }
            if (present)
                return true;
        }
        return false;
    };
    Game.checkFrontDiagonal = function (playerBoxList, val) {
        console.log("checkFrontDiagonal");
        for (var i = 1; i <= val * val; i = i + val + 1) {
            console.log(i, " ", playerBoxList.indexOf(i));
            if (playerBoxList.indexOf(i) != -1)
                continue;
            else {
                return false;
            }
        }
        return true;
    };
    Game.checkBackDiagonal = function (playerBoxList, val) {
        console.log("checkBackDiagonal");
        for (var i = val; i <= (val * val) - val + 1; i = i + val - 1) {
            console.log(i, " ", playerBoxList.indexOf(i));
            if (playerBoxList.indexOf(i) != -1)
                continue;
            else {
                return false;
            }
        }
        return true;
    };
    Game.reset = function () {
        for (var i = 1; i <= size * size; i++)
            document.getElementById(i.toString()).innerHTML = "";
    };
    Game.x_list = [];
    Game.o_list = [];
    Game.player1Turn = true;
    Game.totalBox = 0;
    return Game;
}());
var Box = /** @class */ (function () {
    function Box(BoxId, size) {
        var _this = this;
        this.active = false;
        this.boxId = BoxId;
        var box = document.createElement('div');
        box.style.width = '100px';
        box.style.height = '100px';
        box.style.display = 'inline-block';
        box.style.backgroundColor = 'yellow';
        box.style.verticalAlign = 'top';
        box.style.textAlign = 'center';
        box.style.border = 'thick solid #0000FF';
        box.id = BoxId.toString();
        box.innerHTML = "";
        document.body.appendChild(box);
        box.onclick = function () {
            if (!_this.active) {
                if (Game.player1Turn) {
                    document.getElementById(box.id).innerHTML = 'X';
                    Game.player1Turn = false;
                    Game.x_list.push(BoxId);
                    Game.checkStatus('X', size);
                }
                else {
                    document.getElementById(box.id).innerHTML = 'O';
                    Game.player1Turn = true;
                    Game.o_list.push(BoxId);
                    Game.checkStatus('O', size);
                }
                _this.active = true;
            }
            else {
                alert("please select the Empty box");
            }
            // Game.x_list.push(this.boxId.toString())
            //console.log(Game.x_list)
        };
    }
    return Box;
}());
var size = 5;
for (var i = 1; i <= size * size; i++) {
    var br = document.createElement('br');
    new Box(i, size);
    if (i % size == 0) {
        document.body.appendChild(br);
    }
}
