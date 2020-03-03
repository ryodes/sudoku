var matr = [[8,0,0,0,0,0,0,0,0],
            [0,0,3,6,0,0,0,0,0],
            [0,7,0,0,9,0,2,0,0],
            [0,5,0,0,0,7,0,0,0],
            [0,0,0,0,4,5,7,0,0],
            [0,0,0,1,0,0,0,3,0],
            [0,0,1,0,0,0,0,6,8],
            [0,0,8,5,0,0,0,1,0],
            [0,9,0,0,0,0,4,0,0]];

function afficherRow() {
    console.log("-------------------------");
}

function afficherGrid() {
    afficherRow();
    for (let i=0; i<9; i++) {
        let row = "| ";
        for (let j=0; j<9; j++) {
            row += matr[i][j] + " ";
            if ((j+1)%3==0) {
                row += "| ";
            }
        }
        console.log(row);
        if ((i+1)%3==0) {
            afficherRow();
        }
    }
}

function possible(n,x,y) {
    x0 = Math.floor(x/3)*3;
    y0 = Math.floor(y/3)*3;
    for (let i=0; i<9; i++) {
        if ((matr[x][i]==n) || (matr[i][y]==n)) {
            return false;
        }
    }
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (matr[x0+i][y0+j]==n) {
                return false;
            }
        }
    }
    return true;
}

function onClickCheck() {
    recoverMat();
    for (i=0; i<81 ;i++)  {
        cell = document.querySelector("#cell-"+i);
        x = Math.floor(i/9);
        y = i-x*9;
        val = parseInt(cell.value);
        if (cell.value == "") {
            alert("empty break !");
            return false;
        }
        matr[x][y] = 0;
        if (!possible(val,x,y)) {
            alert("bad breakage !");
            cell.style.color="red";
            return false;
        }
        matr[x][y] = val;
        cell.style.color="";
    }
    alert("Congratulation !!");
    return true;
}

/*Stop when the first solution has been found */
function check() {
    for (i=0; i<81 ;i++)  {
        cell = document.querySelector("#cell-"+i);
        x = Math.floor(i/9);
        y = i-x*9;
        val = parseInt(cell.value);
        if (cell.value == "") {
            return false;
        }
        matr[x][y] = 0;
        if (!possible(val,x,y)) {
            return false;
        }
        matr[x][y] = val;
    }
    return true;
}

function solve() {
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            if (matr[i][j]==0) {
                for (let n=1; n<10; n++) {
                    if (possible(n,i,j)) {
                        matr[i][j]=n;
                        if (check()) {
                            attributMat();
                            return;
                        }
                        solve();
                        matr[i][j]=0;
                    }
                }
                return;
            }
        }
    }
    attributMat();
}

function onClickSolve() {
    console.log("Cheater !!!")
    recoverMat();
    solve();
}

function recoverMat() {
    for (i=0; i<81 ;i++)  {
        cell = document.querySelector("#cell-"+i);
        x = Math.floor(i/9);
        y = i-x*9;
        if (cell.value == "") {
            matr[x][y] = 0;
        } else {
            matr[x][y] = parseInt(cell.value);
        }
    }
}

function attributMat() {
    for (i=0; i<81 ;i++)  {
        cell = document.querySelector("#cell-"+i);
        x = Math.floor(i/9);
        y = i-x*9;
        if (matr[x][y] != 0) {
            cell.value = matr[x][y];
        }
    }
}

function reset() {
    for (i=0; i<81 ;i++)  {
        cell = document.querySelector("#cell-"+i);
        cell.value = "";
    }
    recoverMat();
}
