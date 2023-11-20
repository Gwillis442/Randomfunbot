

var arraySize = 10;
const userDataArray = Array(arraySize).fill({ id: null, coins: null });

function searchArray(id) {
    for (var i = 0; i < userDataArray.length; i++) {
        if (id === userDataArray[i].id) {
            return true;
        }
    }
    return false;
}

function insertArray(id) {
    for (var i = 0; i < userDataArray.length; i++) {
        if (userDataArray[i].username === null) {
            // If the slot is empty, insert the new user
            userDataArray[i] = {id, coins: 100 };
            return true; // Inserted successfully
        } else if (id === userDataArray[i].id) {
            // If the username is already in the array, don't insert
            return false;
        }
    }
    // If the array is full, increase its size and insert the new user
    arraySize++;
    userDataArray.push({ id, coins: 100});
    displayArray();
    return true; // Inserted successfully
}

function displayArray(){
    for (var i = 0; i < userDataArray.length; i++) {
       if(userDataArray[i].id !== null){
        console.log(`ID:${userDataArray[i].id}: Coins: ${userDataArray[i].coins}`);
       }
    }
    return;
}


module.exports = {

    userDataArray,
    arraySize,
    searchArray,
    insertArray,

  }