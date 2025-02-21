class SudokuSolver {
    constructor(grid){
        this.grid = grid;
    }

    inRow(value, row){
        for(let i = 0; i < 9; i++)
        {
            if(this.grid[row][i] == value)
            {
                return true;
            }
        }
        return false;
    }
    
    inCol(value, col){
        for(let i = 0; i < 9; i++)
        {
            if(this.grid[i][col] == value)
            {
                return true;
            }
        }
        return false;
    }

    inBox(value, row, col){
        boxRow = row - (row % 3);
        boxCol = col - (col % 3);

        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if(this.grid[i][j] == value)
                {
                    return true;
                }
            }
        }
        return false;
    }

    solve(){
        for(let row = 0; row < 9; row++)
        {
            for(let col = 0; col < 9; col++)
            {
                if(this.grid[row][col] == 0)
                {
                    for(let value = 1; value < 10; value++)
                    {
                        if(!this.inRow(value, row) && !this.inCol(value, col) && !this.inBox(value, row, col))
                        {
                            this.grid[row][col] = value;
                            if(this.solve())
                            {
                                return true;
                            }
                            else
                            {
                                this.grid[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

}