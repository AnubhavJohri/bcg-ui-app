export function getRightDateFormat(dtISO){
    const dt = new Date(dtISO).toLocaleDateString();
    const arr = dt.split('/');
    if(arr[0].length===1) arr[0] = `0${arr[0]}`;
    if(arr[1].length===1) arr[1] = `0${arr[1]}`;
    return `${arr[2]}-${arr[0]}-${arr[1]}`
}