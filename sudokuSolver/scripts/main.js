import SudokuSolver from "./sudokuSolver.js";

class Main{
    constructor(){
        this.tableGrid = document.getElementById("sudokuGrid");
        this.grid = [];
        this.input = 0;
    }

    makeTable(){
        for (let i = 0; i < 9; i++)
        {
            let row = this.tableGrid.insertRow(i);
            for(let j = 0; j < 9; j++)
            {
                let cell = row.insertCell(j);
                cell.setAttribute("id", i + "" + j);
                cell.setAttribute("class", "box");
                cell.innerHTML = "";
            }
        }
    }

    makeGrid(){
        for(let i = 0; i < 9; i++)
        {
            this.grid.push([]);
            for(let j = 0; j < 9; j++)
            {
                this.grid[i].push(0);
            }
        }
    }
        
    getGrid(){
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                let data = this.tableGrid.rows[i].cells[j].innerHTML;
                if(data != "")
                {
                    this.grid[i][j] = parseInt(data);
                }
                else
                {
                    this.grid[i][j] = 0;
                }
            }
        }
        return this.grid;
    }
    
    setInput(input){
        this.input = input;
    }
    setCell(cell){
        if(this.input > 0 && this.input < 10)
        {
            this.tableGrid.rows[parseInt(cell.charAt(0))].cells[parseInt(cell.charAt(1))].innerHTML = this.input;
        }
        else
        {
            this.tableGrid.rows[parseInt(cell.charAt(0))].cells[parseInt(cell.charAt(1))].innerHTML = "";
        }
    }

    clearTable(){
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                this.tableGrid.rows[i].cells[j].innerHTML = "";
            }
        }
    }

    loadSolution(){
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                this.tableGrid.rows[i].cells[j].innerHTML = this.grid[i][j];
            }
        }
    }
}

const main = new Main();
main.makeTable();
main.makeGrid();

const buttons = document.querySelectorAll(".box");

buttons.forEach(button => {
    button.addEventListener("click", e => {
        let id = e.target.id
        if(id == "clearButton")
        {
            main.clearTable();
            console.log(main.getGrid());
        }
        else if (id == "solveButton")
        {
            let sudokuSolver = new SudokuSolver(main.getGrid());
            if(sudokuSolver.solve())
            {
                main.loadSolution();
            }
        }
        else if(id == "input")
        {
            
            main.setInput(parseInt(e.target.innerHTML));
        }
        else
        {
            main.setCell(id);
        }
    })
})

