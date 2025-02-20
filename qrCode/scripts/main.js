import {makeQRCode, moduleSize} from "./qrCode.js";
import {toBinary, urlToBytes} from "./tools.js";

const qrCode = [];

let url = "https://github.com/orss01";
let numOfCharByte = toBinary(url.length);
let numOfCharByteLength = numOfCharByte.length;

if(numOfCharByteLength < 8)
{
    for(let i = 0; i < (8 - numOfCharByteLength); i++)
    {
        numOfCharByte = "0" + numOfCharByte;
    }
}

let data = "0100" + numOfCharByte + urlToBytes(url) + "0000";

for(let i = 0; i < moduleSize; i++)
{
    qrCode.push([]);
    for(let j = 0; j < moduleSize; j++)
    {
        qrCode[i].push("p");
    }
}

makeQRCode(qrCode, data);
