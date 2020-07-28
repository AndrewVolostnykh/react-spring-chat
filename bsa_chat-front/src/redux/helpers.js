export const removeFromArr = (array, id) => {
    let tempArr = [];
    for(let i = 0; i < array.length; i++) {
        if(i !== id) {
            tempArr.push(array[i]);
        }
    }

    return tempArr;
}