function cc(card) {
    switch(card) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: 
        case 6:
            ++count;
            break;
        case 10:
        case "J":
        case "Q":
        case "K":
        case "A":
            --count;
            break;
    }

    if(count > 0) {
        return count + "Bet";
    } else if(count <= 0) {
        return count + "Hold"
    }else {
        return "Change me"
    }
}


const ourArray = [];

let i = 5;

while(i > 0){
    ourArray.push(i);
    i++;
}

console.log(ourArray);