var crossed_cells = [];
var no_of_lines = 0;
var numbers_crossed = 0;
function hello(){
    document.write('HELOOO')
}
function drawTable() {
    var totalRows = 5;
    var cellsInRow = 5;
    // get the reference for the body
    var div1 = document.getElementById('div1');

    // creates a <table> element
    var tbl = document.createElement("table");

    // creating rows
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25];
    for (var r = totalRows; r > 0; r--) {
      var row = document.createElement("tr");

      // create cells in row
      for (var c = cellsInRow; c > 0; c--) {
        var cell = document.createElement("td");
        cell.setAttribute('id', (5-r)+'_'+(5-c));
        var cellText = document.createTextNode(a.splice(Math.floor(Math.random() * ((r*4) + c - 4)), 1)[0]);
        cell.appendChild(cellText);
        cell.addEventListener("click", function(){
            var arr = event.target.getAttribute('id').split('_');
            var row = parseInt(arr[0],10);
            var col = parseInt(arr[1],10);
            if(crossed_cells[row].substr(col,1) != '1')
            {
                event.target.classList.add('scratchCell');
                numbers_crossed += 1;
                checkBingo(row,col);
            }
          
        });
        row.appendChild(cell);
      }
      tbl.appendChild(row); // add the row to the end of the table body
    }

    div1.appendChild(tbl); // appends <table> into <div1>
    var str='00000';
    for(var k = 0; k < 5; k++){
        crossed_cells.push(str);
    }
  }
  function checkBingo(row,col)
      { 
        var str = crossed_cells[row];
        crossed_cells[row] = str.substr(0,col)+'1'+str.substr(col+1);
        
        var row_crossed = crossed_cells[row] == '11111';
        var col_crossed = numbers_crossed >= 5 ;
        var diag_crossed = numbers_crossed >= 5 && ((row == col) ||((row+col)==4));
        for(var i=0; i<= 4; i++){
            if(crossed_cells[i].substr(col,1) == 0)
            {
                col_crossed = false;
                break;
            }
        }
        if(row == col && (row+col) != 4)
        {
            for(i=0; i <= 4 ; i++){           
                if(crossed_cells[i].substr(i,1)==0)
                {
                    diag_crossed = false;
                    break;
                }
            }                      
        }
        if(row != col && (row+col) == 4)
        {
            for(i=0; i <= 4 ; i++){       
                if(crossed_cells[i].substr(4-i,1) == 0) {
                    diag_crossed = false;
                    break;
                }
            }      
        }
        if((row==col) && ((row+col) == 4))
        {
            for(i=0; i <= 4 ; i++){       
                if((crossed_cells[i].substr(i,1)==0) || (crossed_cells[i].substr(4-i,1) == 0)){
                    diag_crossed = false;
                    break;
                }
            }   
        }
        if(numbers_crossed >= 5 && (row_crossed || col_crossed || diag_crossed))
        {
            if(row_crossed) no_of_lines += 1;
            if(col_crossed) no_of_lines += 1;
            if(diag_crossed) no_of_lines += 1;

            document.getElementById("no_of_lines").innerHTML = no_of_lines;
            if(no_of_lines >= 5)
            {
                alert("BINGO");
            }
        }
}
      