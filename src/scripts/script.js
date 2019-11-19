let canvas;
let ctx;

let t1, t2;

function Start() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    centerX = canvas.width * 0.5;
    centerY = canvas.height * 0.5;
    {
        t2 = new Mesh(10, 0, 20);
        t2.addVertex(5, 5, 5);
        t2.addVertex(-5, 5, 5);
        t2.addVertex(5, -5, 5);
        t2.addVertex(-5, -5, 5);

        t2.addVertex(5, 5, -5);
        t2.addVertex(-5, 5, -5);
        t2.addVertex(5, -5, -5);
        t2.addVertex(-5, -5, -5);

        t2.addTriangle(2, 1, 0);
        t2.addTriangle(1, 2, 3);

        t2.addTriangle(4, 2, 0);
        t2.addTriangle(2, 4, 6);

        t2.addTriangle(4, 5, 6);
        t2.addTriangle(7, 6, 5);

        t2.addTriangle(1, 3, 5);
        t2.addTriangle(7, 5, 3);

        t2.addTriangle(0, 1, 4);
        t2.addTriangle(5, 4, 1);

        t2.addTriangle(6, 3, 2);
        t2.addTriangle(3, 6, 7);

    }
    setInterval(Update, 10);

}
let z = 0;
function Update() {


    t2.rotateX(-.01);
    t2.rotateY(-.01);

    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.strokeStyle = "#000";

    t2.draw(ctx);



}
