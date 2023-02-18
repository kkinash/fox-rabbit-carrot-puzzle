function charMovesToPlace(a, b, c) {
    a.addEventListener("click", () => {
        if (a.parentNode === b) {
            // If the image is in div1, move it to div3
            c.appendChild(a);
            a.style.transform = "translate(0, 0)";
            char_counter +=1;
            console.log(char_counter);
        } else {
            // If the image is in div3, move it back to div1
            b.appendChild(a);
            a.style.transform = "translate(0, 0)";
            char_counter -=1;
            console.log(char_counter);
        }
    });
}

