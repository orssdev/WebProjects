const grid = document.getElementById("sudokuGrid");

// cell.innerHTML = "NEW CELL1";

for (let i = 0; i < 9; i++)
{
    let row = grid.insertRow(i);
    for(let j = 0; j < 9; j++)
    {
        let cell = row.insertCell(j);
        cell.setAttribute("id", (i + 1) + "" + (j + 1));
        cell.setAttribute("class", "box");
        // cell.innerHTML = (i + 1) + " " +  (j + 1);
    }
}