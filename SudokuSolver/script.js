//when we press splve
function getInputValue(){
    InitTableModal();
    let sudokuList=[];
    for(let i=0;i<81;i++){
        sudokuList.push(document.getElementById(i).value);
    } 
    sudokuList=SortSudokuList(sudokuList);
    let grid=ListToGrid(sudokuList);
    ShowGrid(grid);
    if(IsAllInt(sudokuList)){
        if(AllZeros(sudokuList)){
            document.getElementById("alertMessage").innerHTML =("this is not a valid sudoku (all zeros)");
            
        }else{
            if(CheckGridValid(grid)){
                document.getElementById("alertMessage").innerHTML =("this is a valid sudoku press solve to start solving it !");
                document.getElementById("solveButton").innerHTML = `<button type="button" onclick="SolveButtonFunc()" class="btn btn-primary">Solve</button>`;
                return grid;
            }else{
                document.getElementById("alertMessage").innerHTML =("This is not a valid sudoku");
            }
        }
    }else{
        document.getElementById("alertMessage").innerHTML =("Please you can only enter number from 0 to 9.")
    }
}
//change the work of enter key to tab work
let input=document.querySelectorAll('input');
for(let i=0;i<input.length;i++){
    input[i].addEventListener('keyup' , (e) =>{
    if(e.keyCode===13){
        if(i!=input.length-1){
            document.getElementById(i+1).focus();
        }else{
            document.getElementById("SendSudokuButton").click();
        }
       
    }
})
}

//initialize the table of the solution
function InitTableModal(){
    document.getElementById("secondAlertMessage").innerHTML ="";
    document.getElementById("alertMessage").innerHTML="";
    document.getElementById("alertMessage").style.color = "black";
    document.getElementById("secondAlertMessage").style.color = "red";
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            document.getElementById("g"+i+""+j).style.color = "white";
        }
    }
}


function SolveButtonFunc(){
    document.getElementById("alertMessage").innerHTML =("");
    let grid=getInputValue();
    Solving(grid);
    //ShowGrid(grid);
}

//Show grid in the new modal 
function ShowGrid(grid){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            document.getElementById("g"+i+""+j).innerHTML=grid[i][j];
        }
    }
}

//Check if there is any thing else than number from 1 to 9
function IsAllInt(list){
    for(let i=0;i<81;i++){
        if(list[i]!=0&&list[i]!=1&&list[i]!=2&&list[i]!=3&&list[i]!=4&&list[i]!=5&&list[i]!=6&&list[i]!=7&&list[i]!=8&&list[i]!=9){
            return false;
        }
    }
    return true;
}
//Change list to a grid or nested list
function ListToGrid(sudokuList){
    let grid=[[],[],[],[],[],[],[],[],[]];
    let k=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            grid[i][j]=sudokuList[k];
            k++;
        }
    }
    return grid;
}
//change every '' to 0
function SortSudokuList(sudokuList){
    for(let i=0;i<81;i++){
        if(sudokuList[i]===""){
            sudokuList[i]=0;
        }
    }
    return sudokuList;
}
//Check if all grid zero or not
function AllZeros(sudokuList){
    for(let i=0;i<81;i++){
        if(sudokuList[i]!=0){
            return false;
        }
    }
    return true;
}
//check if its valid grid (no numbers repeated in same row or column or block)
function CheckGridValid(grid){
    if(NoRepRow(grid)&&NoRepCol(grid)&&NoRepBlock(grid)){
        return true;
    }
    return false;
}
//check no reapeted numbers on rows
function NoRepRow(grid){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j]!=0){
                for(let k=j+1;k<9;k++){
                    if(grid[i][j]===grid[i][k]){
                        document.getElementById("secondAlertMessage").innerHTML =("the number "+grid[i][j]+" is repeated in the row : "+(i+1));
                        return false;
                    }
                }
            }
            
        }
    }
    return true;
}
//check no reapeted numbers on columns
function NoRepCol(grid){
    for(let j=0;j<9;j++){
        for(let i=0;i<9;i++){
            if(grid[i][j]!=0){
                for(let k=i+1;k<9;k++){
                    if(grid[i][j]===grid[k][j]){
                        document.getElementById("secondAlertMessage").innerHTML =("the number "+grid[i][j]+" is repeated in the column : "+(j+1));
                        return false;
                    }
                }
            }
            
        }
    }
    return true;
}
//check no reapeted numbers on blocks
function NoRepBlock(grid){
    let block=[];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 1");
        return false;
    }
    block=[];
    
    for(let i=0;i<3;i++){
        for(let j=3;j<6;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 2");
        return false;
    }
    block=[];
    
    for(let i=0;i<3;i++){
        for(let j=6;j<9;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 3");
        return false;
    }
    block=[];
    
    for(let i=3;i<6;i++){
        for(let j=0;j<3;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 4");
        return false;
    }
    block=[];
    
    for(let i=3;i<6;i++){
        for(let j=3;j<6;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 5");
        return false;
    }
    block=[];
    
    for(let i=3;i<6;i++){
        for(let j=6;j<9;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 6");
        return false;
    }
    block=[];
    
    for(let i=6;i<9;i++){
        for(let j=0;j<3;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 7");
        return false;
    }
    block=[];
    
    for(let i=6;i<9;i++){
        for(let j=3;j<6;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 8");
        return false;
    }
    block=[];
    
    for(let i=6;i<9;i++){
        for(let j=6;j<9;j++){
            block.push(grid[i][j]);
        }
    }
    if(!NoRepList(block)){
        document.getElementById("secondAlertMessage").innerHTML =("repeated number on block 9");
        return false;
    }
    block=[];
    return true;
}
//check no reapeted numbers on list converted from blocks
function NoRepList(list){
    for(let i=0;i<9;i++){
        if(list[i]!=0){
            for(let k=i+1;k<9;k++){
                if(list[i]===list[k]){
                    return false;
                }
            }   
        }
    }
    return true;
}
//start solution
function Solving(grid){
    let count=0;
    while(count<2&&!NoZeroLeft(grid)){
        let numberFounded=false;
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(grid[i][j]==0){
                    let tempList=[1,2,3,4,5,6,7,8,9];
                    let k=0;
                    while(k<9&&tempList.length!=1){
                        tempList=RemoveFromList(grid[i][k],tempList);//remove the numbers in the same row
                        tempList=RemoveFromList(grid[k][j],tempList);//remove the numbers in the same column
                        tempList=RemoveFromBlock(grid,tempList,i,j);//remove the numbers in the same block
                        k++;
                    }
                    //if we removed 8 numbers we put the rest one 
                    if(tempList.length==1){
                        grid[i][j]=tempList[0];numberFounded=true;
                        document.getElementById("g"+i+""+j).innerHTML =grid[i][j];
                        document.getElementById("g"+i+""+j).style.color = "green";
                    }
                }
                
            }
        }
        //check after we loop if something changed or not
        if(numberFounded==true){
            count=0;
        }else{
            count++;
        }
    }
    if(count>=2){
        document.getElementById("alertMessage").innerHTML =("this sudoku not from the base level (the easy level) !!");
        document.getElementById("alertMessage").style.color = "red";
    }else{
        document.getElementById("alertMessage").innerHTML =("Done !!!");
        document.getElementById("alertMessage").style.color = "green";
    }
}

//check if the solution done or not
function NoZeroLeft(grid){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

//remove element by value from list
function RemoveFromList(x,list){
    for(let i=0;i<list.length;i++){
        if(list[i]==x){
            list.splice(i,1);
        }
    }
    return list;
}

//remove element in the same block
function RemoveFromBlock(grid,tempList,i,j){
    //check block position
    let r=0;let c=0;
    if(i<3){
        r=0;
    }else if(i>=3&&i<6){
        r=3;
    }else{
        r=6;
    }
    if(j<3){
        c=0;
    }else if(j>=3&&j<6){
        c=3;
    }else{
        c=6;
    }
    //loop into the block position and remove the numbers
    for(let ii=r;ii<r+3;ii++){
        for(let jj=c;jj<c+3;jj++){
            tempList=RemoveFromList(grid[ii][jj],tempList);//remove the number that in same block
        }
    }
    return tempList;
}

