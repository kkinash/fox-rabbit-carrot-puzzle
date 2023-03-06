"use strict";



const fox = document.getElementById("fox");
const rabbit = document.getElementById("rabbit");
const carrot = document.getElementById("carrot");
// const characters = document.getElementsByClassName('characters');

const farmer = document.getElementById("farmer");
const farmers_place = document.getElementById("farmers_place");

const start = document.getElementById("start");
const boat1 = document.getElementById("boat1");
const boat2 = document.getElementById("boat2");
const boat = document.getElementById("theboat");
const farmers_place2 = document.getElementById("farmers_place2");
const end = document.getElementById("end");

const message = document.getElementById("message");
const message2 = document.getElementById("message2");

const errorArray1 = ["fox", "rabbit"];
const errorArray2 = ["rabbit", "carrot"];

const beginarray = ["fox", "rabbit", "carrot"];
const winarray = ["fox", "rabbit", "carrot"];
const endarray = [];
const charintheboat = [];

let char_counter = 0;
let farmer_counter = 0;
let is_boat_left = true;

/* START ERRORS FUNCTIONS */
function showError(a) {
    let get = document.getElementById(a);
    get.style.display = "block";
    // setTimeout(() => {
    //     get.style.display = 'none';
    // }, 6000);
}

/* END ERRORS FUNCTIONS */

/* START MOVING FUNCTIONS */
function charMovesToPlace(a, b, c, d, e) {
    a.addEventListener("click", () => {
        if (char_counter != 0 && a.parentNode === b) {
            showError('CharallreadyInTheBoatMessage');
            console.log(char_counter);

        } else {
            if (a.parentNode === b) {
                if (is_boat_left == false) {
                    showError('noBoatErrorMessage');
                    console.log('is_boat_left ->' + is_boat_left);
                } else {
                    // If the image is in div1, move it to div3
                    c.appendChild(a);
                    char_counter += 1;
                    // deleting character from the characters Array
                    var index = beginarray.indexOf(a.id);
                    beginarray.splice(index, 1);
                    // Adding character to the Check Array
                    charintheboat.push(a.id);
                    console.log('char ' + char_counter);
                }
            } else if (a.parentNode === d) {
                // If the image is in div1, move it to div3
                e.appendChild(a);
                char_counter -= 1;
                // Adding character to the End Array
                endarray.push(a.id);
                console.log(endarray);
                // deleting character from the Check Array
                charintheboat.splice(0);
                console.log('char ' + char_counter);
            } else if (a.parentNode === e) {
                if (is_boat_left == true) {
                    showError('noBoatErrorMessage');
                    // console.log('is_boat_left ->' + is_boat_left);
                } else {
                    // If the image is in div1, move it to div3
                    d.appendChild(a);
                    char_counter += 1;
                    // deleting character from the characters Array
                    var index = endarray.indexOf(a.id);
                    endarray.splice(index, 1);
                    console.log('endarray ->' + endarray);
                    // deleting character from the Check Array
                    charintheboat.push(a.id);
                    console.log('char ' + char_counter);

                }
            } else {
                // If the image is in div3, move it back to div1
                b.appendChild(a);
                char_counter -= 1;
                // Adding character to the characters Array
                beginarray.push(a.id);
                // deleting character from the Check Array
                charintheboat.splice(0);
                console.log('char ' + char_counter);
            }
            finalCheck();
        }

    });
}


charMovesToPlace(fox, start, boat1, boat2, end);
charMovesToPlace(rabbit, start, boat1, boat2, end);
charMovesToPlace(carrot, start, boat1, boat2, end);


/* START FINAL CHECK*/
function finalCheck() {
    let win = compareArrays(endarray, winarray);
    // console.log('check!')
    if (win == true && farmer_counter == 0) {
        vex.dialog.alert("You WIN!");
    }
};
/* END FINAL CHECK*/


function farmerMovesToPlace(a, b, c, d, e) {
    a.addEventListener("click", () => {

        if (a.parentNode === b) {
            // If the image is in div1, move it to div3
            c.appendChild(a);
            farmer_counter += 1;
            console.log('farmer # ' + farmer_counter);
        } else if (a.parentNode === d) {
            e.appendChild(a);
            farmer_counter -= 1;
            console.log('farmer ' + farmer_counter);

            console.log('check?!')
        } else if (a.parentNode === e) {
            d.appendChild(a);
            farmer_counter += 1;
            console.log('farmer ' + farmer_counter);

        }
        else {
            // If the image is in div3, move it back to div1
            b.appendChild(a);
            farmer_counter -= 1;
            console.log('farmer ' + farmer_counter);
        }
        finalCheck();
    });
}

farmerMovesToPlace(farmer, farmers_place, boat1, boat2, farmers_place2);

// boat moves to other side

/////* compare arrays *//////////
const compareArrays = (a, b) => {
    if (a.length !== b.length) return false;
    const elements = new Set([...a, ...b]);
    for (const x of elements) {
        const count1 = a.filter(e => e === x).length;
        const count2 = b.filter(e => e === x).length;
        if (count1 !== count2) return false;
    }
    return true;
}
//////*START BOAT GOES FORWARD *//////

message.addEventListener("click", () => {
    if (farmer_counter == 0) {
        showError('NoFarmerInTheBoatMessage');
        // } else if (char_counter != 0) {
        // 
    } else {
        /* check characters, which were left at the start*/
        let firstcheck = false;
        let secondcheck = false;
        firstcheck = compareArrays(beginarray, errorArray1);
        secondcheck = compareArrays(beginarray, errorArray2);
        if (firstcheck === true) {
            vex.dialog.alert("Oops! The Fox ate the Rabbit! ");
        }
        else if (secondcheck === true) {
            vex.dialog.alert("Oops! The Rabbit ate the Carrot!");
        }
        else {
            is_boat_left = false;
            boat2.appendChild(farmer);
            boat2.appendChild(boat);
            boat.className = "boat_right";
            let x = document.getElementById(charintheboat[0]); // what character is in the charArray/boat
            if (!x) {
                // console.log('forvard no character!');
            } else {
                boat2.appendChild(x); // moving chatacter to right boat}
            }
            firstcheck = false;
            secondcheck = false;
            message.style.display = "none";
            message2.style.display = "block";
            is_boat_left = false;
            // console.log('is_boat_left ->' + is_boat_left);

        }
    }
})
    ;
//////*END BOAT GOES BACK *//////



/////* compare arrays *//////////


message2.addEventListener("click", () => {
    if (farmer_counter == 0) {
        showError('NoFarmerInTheBoatMessage');
        // } else if (char_counter != 0) {
        // 
    } else {
        let f = false;
        let s = false;
        f = compareArrays(endarray, errorArray1);
        // console.log(endarray); console.log(errorArray1); console.log(f);
        s = compareArrays(endarray, errorArray2);
        if (f == true) {
            vex.dialog.alert("Oops! The Fox ate the Rabbit!");
        }
        else if (s == true) {
            vex.dialog.alert("Oops! The Rabbit ate the Carrot!");
        }
        else {
            boat1.appendChild(farmer);
            boat1.appendChild(boat);
            boat.className = "boat";
            let y = document.getElementById(charintheboat[0]);
            if (!y) {
                // console.log('forvard no character');
            } else { boat1.appendChild(y) };
            f = false;
            s = false;
            y = null;
            message2.style.display = "none";
            message.style.display = "block";
            is_boat_left = true;
            // console.log('is_boat_left ->' + is_boat_left);
        }
    }
})
    ;
/** hiding element */
/*
WIN
*/
