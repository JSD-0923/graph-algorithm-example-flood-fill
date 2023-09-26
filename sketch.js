// img for the image, visited
let img, visited;

function setup() {
    // create canvas
    createCanvas(800, 800);

    // attach loadImage to the file input
    let fileInput = select('#imageUpload');
    fileInput.changed(handleImageUpload);
}


function mouseClicked(evt) {
    if (evt.target.id == 'defaultCanvas0') {

        // flood fill with purple from the mouse position
        floodFill(mouseX, mouseY, [255, 0, 255, 255]);

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
 * Check if the two colors are the same by comparing their RGBA values
 */
const isSameColor = (color1, color2) => {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}

function createVisitedArray() {
    let arr = []

    for (let i = 0; i < 800; i++) {
        arr[i] = []
        for (let j = 0; j < 800; j++) {
            arr[i][j] = false;
        }
    }

    return arr;
}


/**
 * Flood fill algorithm
 */
const floodFill = (x, y, fillColor) => {
    visited = createVisitedArray();
    clickedColor = get(x, y);

    function flood(posX, posY) {
        // check if we in the bounds of the canvas
        if (posX < 0 || posX >= 800 || posY < 0 || posY >= 800)
            return;

        // check for visited pixels, if it is visited, then do nothing
        if (visited[posX][posY] === true) return;

        // mark the pixel as visited
        visited[posX][posY] = true;


        // check if the pixel is the same color as the clicked pixel
        if (!isSameColor(clickedColor, get(posX, posY)))
            return

        set(posX, posY, fillColor)

        // recursively call flood on the surrounding pixels
        flood(posX + 1, posY); // right
        flood(posX - 1, posY); // left
        flood(posX, posY + 1); // down
        flood(posX, posY - 1); // up
    }

    // start flooding
    flood(x, y);

    // reflect color changes that we made on the canvas
    updatePixels();
}

