const canvas = document.getElementById("qrCode");
const ctx = canvas.getContext("2d");
const startx = 40;
const starty = 40;
const moduleSize = 29;
const qrCode = [];
let left = true;
let up = true;
let down = false;
let url = "https://github.com/orss01";

for(let i = 0; i < moduleSize; i++)
{
    qrCode.push([]);
    for(let j = 0; j < moduleSize; j++)
    {
        qrCode[i].push("p");
    }
}

function drawSquare(x,y)
{
    ctx.fillStyle = "Black";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawRedSquare(x,y)
{
    ctx.fillStyle = "Red";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawBlueSquare(x,y)
{
    ctx.fillStyle = "Blue";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawGreenSquare(x,y)
{
    ctx.fillStyle = "Green";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawPurpleSquare(x,y)
{
    ctx.fillStyle = "Purple";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawGreySquare(x,y)
{
    ctx.fillStyle = "Grey";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}

function drawPinkSquare(x,y)
{
    ctx.fillStyle = "Pink";
    ctx.fillRect(startx + (20 * y), starty + (x * 20), 20, 20);
}


function toBinary(input)
{
    if(input == 1)
    {
        return "1";
    }
    let bit = input % 2;
    return toBinary(Math.floor(input / 2)) + bit;
}


function urlToBytes(url)
{
    let bytes = "";
    for(let i = 0; i < url.length; i++)
    {
        let byte = toBinary(url.charCodeAt(i));
        let byteLength = byte.length
        if (byteLength < 8)
        {
            for(let j = 0; j < (8 - byteLength); j++)
            {
                byte = "0" + byte;
            }
        }
        bytes += byte;
    }

    return bytes;
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function timingPattern(qrCode)
{
    for(let i = 0; i < moduleSize; i++)
    {
        if (i % 2 == 0)
        {
            qrCode[i][6] = "tp1";
            qrCode[6][i] = "tp1";
        }
        else
        {
            qrCode[i][6] = "tp0";
            qrCode[6][i] = "tp0";
        }
    }
}

/*
    @param qrCode - 2D array of the qrCode layout
    @param x, y - coordinates of the top of the black box
*/
function finderPatternBox(qrCode, x, y)
{
    for(let i = 0; i < 7; i++)
    {
        qrCode[x][i + y] = "fp1";
        qrCode[i + x][y] = "fp1";
        qrCode[x + 6][i + y] = "fp1";
        qrCode[i + x][y + 6] = "fp1";
    }
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            qrCode[x + 2 + i][y + 2 + j] = "fp1";
        }
    }

    for(let i = 0; i < 5; i++)
    {
        qrCode[x + 1][y + 1 + i] = "fp0";
        qrCode[x + 1 + i][y + 1] = "fp0";
        qrCode[x + 5][y + 1 + i] = "fp0";
        qrCode[x + 1 + i][y + 5] = "fp0";
    }

    if(x == 0 && y == 0)
    {
        for(let i = 0; i < 8; i++)
        {
            qrCode[x + 7][i] = "fp0";
            qrCode[i][y + 7] = "fp0";
        }
    }
    else if(x == 0)
    {
        for(let i = 0; i < 8; i++)
        {
            qrCode[x + 7][y - 1 + i] = "fp0";
            qrCode[x + i][y - 1] = "fp0";
        }
    }
    else
    {
        for(let i = 0; i < 8; i++)
        {
            qrCode[x - 1][y + i] = "fp0";
            qrCode[x + i - 1][y + 7] = "fp0";
        }
    }
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function finderPattern(qrCode)
{
    let offset = moduleSize - 7;
    finderPatternBox(qrCode, 0, 0);
    finderPatternBox(qrCode, offset, 0);
    finderPatternBox(qrCode, 0, offset);
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function alignmentPattern(qrCode)
{
    let offset1 = moduleSize - 9;
    for(let i = offset1; i < offset1 + 5; i++)
    {
        qrCode[i][offset1] = "ap1";
        qrCode[offset1][i] = "ap1";
        qrCode[i][offset1 + 4] = "ap1";
        qrCode[offset1 + 4][i] = "ap1";
    }

    let offset0 = moduleSize - 8;
    for(let i = offset0; i < offset0 + 3; i++)
    {
        qrCode[i][offset0] = "ap0";
        qrCode[offset0][i] = "ap0";
        qrCode[i][offset0 + 2] = "ap0";
        qrCode[offset0 + 2][i] = "ap0";
    }

    qrCode[offset1 + 2][offset1 + 2] = "ap1";
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function formatBits(qrCode)
{
    for(let i = 0; i < 9; i++)
    {
        qrCode[i][8] = "fb0";
        qrCode[8][i] = "fb0";
        if(i < 8)
        {
            qrCode[moduleSize - 8 + i][8] = "fb0";
            qrCode[8][moduleSize - 8 + i] = "fb0";
        }
    }
    qrCode[8][6] = "tp1"
    qrCode[6][8] = "tp1"
    qrCode[moduleSize - 8][8] = "fb1"
}



/*
    @param qrCode - 2D array of the qrCode layout
*/
function data(qrCode)
{
    let data = "0100" + urlToBytes(url) + "0000";
    let row = moduleSize - 1;
    let col = moduleSize - 1;
    for(let i = 0; i < data.length; i++)
    {
        console.log("Row " + row);
        console.log("Col " + col);
        if(up)
        {
            qrCode[row][col] = data.charAt(i);
            if(left)
            {
                left = false
                col--;
            }
            else
            {
                left = true;
                col++;
                row--;
            }
            if(row < 0)
            {
                row++;
                col--;
                qrCode[row][--col] = data.charAt(++i);
                qrCode[row][--col] = data.charAt(++i);
                up = false;
                down = true;
                left = false;
            }
            if(qrCode[row][col] == "fb0" || qrCode[row][col] == "fb1")
            {
                col--;
                qrCode[++row][--col] = data.charAt(++i);
                qrCode[row][--col] = data.charAt(++i);
                up = false;
                down = true;
                left = false;
            }
            if(qrCode[row][col] == "ap1" && qrCode[row][col - 1] == "ap1")
            {
                row -= 5;
            }
            else if(qrCode[row][col] == "ap1")
            {
                col--;
                for(let j = 0; j < 5; j++)
                {
                    qrCode[row--][col] = data.charAt(++i);
                }
                col++;
                left = true;
            }
            if(qrCode[row][col] == "tp1")
            {
                row--;
            }
        }
        if(down)
        {
            qrCode[row][col] = data.charAt(i);
            if(left)
            {
                left = false;
                col--;
            }
            else
            {
                left = true;
                col++;
                row++;
            }
            if(row > moduleSize - 1)
            {
                row--;
                col--;
                qrCode[row][--col] = data.charAt(++i);
                qrCode[row][--col] = data.charAt(++i);
                up = true;
                down = false;
                left = false;
            }
            if(qrCode[row][col] == "ap1")
            {
                row += 5;
            }
            if(qrCode[row][col] == "tp1")
            {
                row++;
            }
        }
    }
}

function loadQRCode(qrCode) 
{
    timingPattern(qrCode);
    finderPattern(qrCode);
    alignmentPattern(qrCode);
    formatBits(qrCode);
    data(qrCode);
}

function drawQRCode(qrCode)
{
    for (let i = 0; i < moduleSize; i++)
    {
        for (let j = 0; j < moduleSize; j++)
        {
            if(qrCode[i][j] == "1")
            {
                drawSquare(i,j);
            }
            else if(qrCode[i][j] == "fp1")
            {
                drawRedSquare(i,j);
            }
            else if(qrCode[i][j] == "tp1")
            {
                drawBlueSquare(i,j);
            }
            else if(qrCode[i][j] == "ap1")
            {
                drawGreenSquare(i,j);
            }
            else if(qrCode[i][j] == "fb1")
            {
                drawPurpleSquare(i,j);
            }
            else if(qrCode[i][j] == "p")
            {
                drawPinkSquare(i,j);
            }
            else if(qrCode[i][j] == "tp0" ||
                    qrCode[i][j] == "fp0" ||
                    qrCode[i][j] == "ap0" ||
                    qrCode[i][j] == "fb0"
            )
            {
                drawGreySquare(i,j);
            }
        }
    }
}

loadQRCode(qrCode);
drawQRCode(qrCode);

let burl = "0100" + urlToBytes(url) + "0000";

for(let e of qrCode)
{
    console.log(e);
}
console.log(burl);
console.log(burl.length);