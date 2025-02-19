const canvas = document.getElementById("qrCode");
const ctx = canvas.getContext("2d");
const startx = 40;
const starty = 40;
const qrCode = [];

for(let i = 0; i < 25; i++)
{
    qrCode.push([]);
    for(let j = 0; j < 25; j++)
    {
        qrCode[i].push(0);
    }
}

let url = "https://github.com/orss01";

function drawSquare(x,y)
{
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


function urlToBinary(url)
{
    let byteValues = [];
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
        byteValues.push(byte);
    }

    return byteValues;
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function timingPattern(qrCode)
{
    for(let i = 0; i < 25; i++)
    {
        if (i % 2 == 0)
        {
            qrCode[i][6] = 1;
            qrCode[6][i] = 1;
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
        qrCode[x][i + y] = 1;
        qrCode[i + x][y] = 1;
        qrCode[x + 6][i + y] = 1;
        qrCode[i + x][y + 6] = 1;
    }
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            qrCode[x + 2 + i][y + 2 + j] = 1
        }
    }
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function finderPattern(qrCode)
{
    finderPatternBox(qrCode, 0, 0);
    finderPatternBox(qrCode, 18, 0);
    finderPatternBox(qrCode, 0, 18);
}

/*
    @param qrCode - 2D array of the qrCode layout
*/
function alignmentPattern(qrCode)
{
    for(let i = 16; i < 21; i++)
    {
        qrCode[i][16] = 1;
        qrCode[16][i] = 1;
        qrCode[i][16 + 4] = 1;
        qrCode[16 + 4][i] = 1;
    }

    qrCode[18][18] = 1;
}

function loadQRCode(qrCode) 
{
    timingPattern(qrCode);
    finderPattern(qrCode);
    alignmentPattern(qrCode);
    qrCode[17][8] = 1
}

function drawQRCode(qrCode)
{
    for (let i = 0; i < 25; i++)
    {
        for (let j = 0; j < 25; j++)
        {
            if(qrCode[i][j] == 1)
            {
                drawSquare(i,j);
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