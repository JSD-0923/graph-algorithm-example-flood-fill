let img;
const fillColor = [255, 0, 255, 255]
let canvasW = 80
let canvasH = 80

function setup() {
    createCanvas(canvasW, canvasH);
    let fileInput = select('#imageUpload');
    fileInput.changed(handleImageUpload);
}


function mouseClicked(evt) {
    if (evt.target.id == 'defaultCanvas0') {
        // Flood fill at mouse position
        let x = mouseX;
        let y = mouseY;

        const currentColor = get(x, y)
        floodFill(x, y, currentColor);

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


// const dirX = [1, -1, 0 , 0]
// const dirY = [0, 0, 1, -1]

/**
 * Check if the two colors are the same by comparing their RGBA values
 */
const isSameColor = (color1, color2) => {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}

const createVisited = () => (new Array(canvasH)).fill((new Array(canvasW)).fill(false)) 

/**
 * Implement flood fill algorithm
 */
function floodFill(x, y, currentColor) {
    const visited = createVisited()

    function dfs(x, y) {
        // Boundary check
        if (x <= -1 || y <= -1 || y >= canvasW || x >= canvasH) {
            return
        }

        if (visited[x][y]) {
            return 
        }
        
        visited[x][y] = true


        const pixelColor = get(x, y)
        // check if the pixle has the same color
        if (isSameColor(pixelColor, currentColor)) {
            return
        }

        // color the pixel
        set(x, y, fillColor)

        dfs(x + 1, y) // down
        dfs(x - 1, y) // up
        dfs(x, y + 1) // right
        dfs(x, y - 1) // left
    }

    // start flood fill
    dfs(x, y)

    // update pixels
    updatePixels();
}

