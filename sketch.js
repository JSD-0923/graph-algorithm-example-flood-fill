let img;

function setup() {
    createCanvas(400, 400);
    let fileInput = select('#imageUpload');
    fileInput.changed(handleImageUpload);
}

function draw() {
}

function mouseClicked(evt) {
    if (evt.target.id == 'defaultCanvas0') {
        // Flood fill at mouse position
        let x = mouseX;
        let y = mouseY;

        ellipse(x, y, 10, 10);

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
