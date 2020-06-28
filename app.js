/**
 * |0|0|0|0|0| Array of strings that represent which cell in the grid is checked/scratched and 
 * |0|0|0|0|0| which is not. 0 = not scratched | 1 = scratched. The array will be initially filled
 * |0|0|0|0|0| with all 0's as shown aside. Each 0 represents a cell unchecked in the grid.
 * |0|0|0|0|0| Checking a cell in the original grid will change the corresponding 0 in this 
 * |0|0|0|0|0| array.  
  */ 

var crossed_cells = [];
/**
 * No of lines made so far.
 */
var no_of_lines = 0;
/**
 * No of numbers crossed
 */
var numbers_crossed = 0;
/**
 * Text that will be used to fill the BINGO display text
 */
var bingoText = 'BINGO';
/**
 * BINGO display text
 */
var displayText = '';

/**
 * This function is used to dynamically generate a table grid of 5x5 dimension for BINGO
 */
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

    //Initializing the crossed_cells array with 5 strings of '00000'
    var str='00000';
    for(var k = 0; k < 5; k++){
        crossed_cells.push(str);
    }
  }

  /**
   * Function to increase no_of_lines crossed and check if BINGO is complete.
   * @param {int} row 
   * @param {int} col 
   */
  function checkBingo(row,col)
      { 
        var str = crossed_cells[row];
        crossed_cells[row] = str.substr(0,col)+'1'+str.substr(col+1);
        
        var row_crossed = crossed_cells[row] == '11111';
        var col_crossed = numbers_crossed >= 5 ;
        var left_diag_crossed = numbers_crossed >= 5 && (row == col);
        var right_diag_crossed = numbers_crossed >= 5 && ((row+col)==4);

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
                    left_diag_crossed = false;
                    break;
                }
            }                      
        }
        
        if(row != col && (row+col) == 4)
        {
            for(i=0; i <= 4 ; i++){       
                if(crossed_cells[i].substr(4-i,1) == 0) {
                    right_diag_crossed = false;
                    break;
                }
            }      
        }
        if((row==col) && ((row+col) == 4))
        {
            for(i=0; i <= 4 ; i++){       
                if((crossed_cells[i].substr(i,1)==0)) {
                    left_diag_crossed = false;
                    break;
                }
                if((crossed_cells[i].substr(4-i,1) == 0)) {
                    right_diag_crossed = false;
                    break;
                }
            }   
        }
        if(numbers_crossed >= 5 && (row_crossed || col_crossed || left_diag_crossed || right_diag_crossed))
        {
            if(row_crossed) no_of_lines += 1;
            if(col_crossed) no_of_lines += 1;
            if(left_diag_crossed) no_of_lines += 1;
            if(right_diag_crossed) no_of_lines += 1;

            document.getElementById("no_of_lines").innerHTML = no_of_lines;
            displayText = no_of_lines >=5 ? bingoText.substr(0,5):bingoText.substr(0,no_of_lines);
            document.getElementById("bingo_Text").innerHTML = displayText;
        }
}
      