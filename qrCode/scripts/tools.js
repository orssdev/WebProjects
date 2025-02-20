export function toBinary(input)
{
    if(input == 1)
    {
        return "1";
    }
    let bit = input % 2;
    return toBinary(Math.floor(input / 2)) + bit;
}


export function urlToBytes(url)
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