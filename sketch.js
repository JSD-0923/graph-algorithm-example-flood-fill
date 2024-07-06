let img;
const fillColor = [255, 0, 255, 255]

function setup() {
    createCanvas(400, 400);
    let fileInput = select('#imageUpload');
    fileInput.changed(handleImageUpload);
}


function mouseClicked(evt) {
    if (evt.target.id == 'defaultCanvas0') {
        // Flood fill at mouse position
        let x = mouseX;
        let y = mouseY;


        floodFill(x, y, fillColor);

        // prevent default
        return false;
    }
}

function handleImageUpload() {
    let file = select('#imageUpload').elt.files[0];

    if (file.type.includes('image')) {
        img = loadImage(window.URL.createObjectURL(file), () => {
            image(img, 0, 0);
        })
    } else {
        alert('Please select a valid image file.');
    }
}


/**
 * Implement flood fill algorithm
 */
function floodFill(x, y, color) {
    ellipse(x, y, 10, 10);
}

