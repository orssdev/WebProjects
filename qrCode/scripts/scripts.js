const canvas = document.getElementById("qrCode");
const ctx = canvas.getContext("2d");
const startx = 40;
const starty = 40;
const moduleSize = 29;
const qrCode = [];
let url = "https://github.com/orss01";

for(let i = 0; i < moduleSize; i++)
{
    qrCode.push([]);
    for(let j = 0; j < moduleSize; j++)
    {
        qrCode[i].push("0");
    }
}

function drawSquare(x,y)
{
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
        let byteLength = bytes.length
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
    let offset = moduleSize - 8;
    for(let i = offset; i < offset + 5; i++)
    {
        qrCode[i][offset] = "ap1";
        qrCode[offset][i] = "ap1";
        qrCode[i][offset + 4] = "ap1";
        qrCode[offset + 4][i] = "ap1";
    }

    qrCode[offset + 2][offset + 2] = "ap1";
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function formatBits(qrCode)
{
    qrCode[moduleSize - 8][8] = "fb1"
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function data(qrCode)
{
    let data = "0100" + urlToBytes(url) + "0000";
}

function loadQRCode(qrCode) 
{
    timingPattern(qrCode);
    finderPattern(qrCode);
    alignmentPattern(qrCode);
    formatBits(qrCode);
}

function drawQRCode(qrCode)
{
    for (let i = 0; i < moduleSize; i++)
    {
        for (let j = 0; j < moduleSize; j++)
        {
            if(qrCode[i][j] == 1)
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
        }
    }
}

loadQRCode(qrCode);
drawQRCode(qrCode);
for(let e of qrCode)
{
    console.log(e);
}

let burl = "0100" + urlToBytes(url) + "0000";

console.log(burl);