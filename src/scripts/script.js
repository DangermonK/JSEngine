let canvas;
let ctx;

let c1;

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Start() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    centerX = canvas.width * 0.5;
    centerY = canvas.height * 0.5;

    document.addEventListener("keydown", function (e) {
       switch(e.key) {
           case 'w':
               speedZ = 1;
               break;
           case 'a':
               speedX = -1;
               break;
           case 's':
               speedZ = -1;
               break;
           case 'd':
               speedX = 1;
               break;
           case 'k':
               speedY = -1;
               break;
           case 'm':
               speedY = 1;
               break;
           case '2':
               rotX = 1;
               break;
           case '8':
               rotX = -1;
               break;
           case '4':
               rotZ = -1;
               break;
           case '6':
               rotZ = 1;
               break;
           case '7':
               rotY = 1;
               break;
           case '9':
               rotY = -1;
               break;
       }
    });

    document.addEventListener("keyup", function (e) {
        switch(e.key) {
            case 'w':
                speedZ = 0;
                break;
            case 'a':
                speedX = 0;
                break;
            case 's':
                speedZ = 0;
                break;
            case 'd':
                speedX = 0;
                break;
            case 'k':
                speedY = 0;
                break;
            case 'm':
                speedY = 0;
                break;
            case '8':
                rotX = 0;
                break;
            case '2':
                rotX = 0;
                break;
            case '4':
                rotZ = 0;
                break;
            case '6':
                rotZ = 0;
                break;
            case '7':
                rotY = 0;
                break;
            case '9':
                rotY = 0;
                break;
        }
    });

    c1 = new Cube(0, 0, 200, 10, 12, 7);
    setInterval(Update, 16);

}
let speedX = 0, speedZ = 0, speedY = 0, rotX = 1,rotY = 0.5,rotZ = 0;
let rotScale = 0.01;
let timer = 0;

function Update() {

    timer += 0.02
    c1.setPosition(Math.sin(timer) * 50, Math.sin(timer * Math.PI * 0.5) * 40, Math.sin(timer * Math.PI * 0.25) * 130 + 200);
    //speedY = Math.sin(timer + Math.pi*0.5) * 0.2;

    c1.rotateX(rotX * rotScale);
    c1.rotateY(rotY * rotScale);
    c1.rotateZ(rotZ * rotScale);

    //c1.movePosition(speedX, speedY, speedZ);

    ctx.clearRect(0,0, canvas.width,canvas.height);
    c1.draw(ctx);


}
