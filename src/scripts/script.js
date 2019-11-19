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
        t2 = new Mesh(0, 0, 100);
        t2.addVertex(5, 5, 5);
        t2.addVertex(-5, 5, 5);
        t2.addVertex(5, -5, 5);
        t2.addVertex(-5, -5, 5);

        t2.addVertex(5, 5, -5);
        t2.addVertex(-5, 5, -5);
        t2.addVertex(5, -5, -5);
        t2.addVertex(-5, -5, -5);

        t2.addTriangle(0, 1, 2);
        t2.addTriangle(1, 2, 3);

        t2.addTriangle(4, 5, 6);
        t2.addTriangle(5, 6, 7);

        t2.addTriangle(0, 2, 4);
        t2.addTriangle(2, 4, 6);

        t2.addTriangle(1, 3, 5);
        t2.addTriangle(3, 5, 7);

        t2.addTriangle(0, 1, 4);
        t2.addTriangle(1, 4, 5);

        t2.addTriangle(2, 3, 6);
        t2.addTriangle(3, 6, 7);
    }
    {
        t1 = new Mesh(0, 0, 50);
        t1.addVertex(5, 5, 5);
        t1.addVertex(-5, 5, 5);
        t1.addVertex(5, -5, 5);
        t1.addVertex(-5, -5, 5);

        t1.addVertex(5, 5, -5);
        t1.addVertex(-5, 5, -5);
        t1.addVertex(5, -5, -5);
        t1.addVertex(-5, -5, -5);

        t1.addTriangle(0, 1, 2);
        t1.addTriangle(1, 2, 3);

        t1.addTriangle(4, 5, 6);
        t1.addTriangle(5, 6, 7);

        t1.addTriangle(0, 2, 4);
        t1.addTriangle(2, 4, 6);

        t1.addTriangle(1, 3, 5);
        t1.addTriangle(3, 5, 7);

        t1.addTriangle(0, 1, 4);
        t1.addTriangle(1, 4, 5);

        t1.addTriangle(2, 3, 6);
        t1.addTriangle(3, 6, 7);
    }

    setInterval(Update, 10);

}
let z = 0;
function Update() {

    z+=0.01;
    t1.setPosition(Math.sin(z) * 30, Math.sin(z * 0.5) * 30,50);
    t1.rotateZ(-.01);
    t1.rotateX(-.01);
    t1.rotateY(-.01);

    t2.rotateX(-.005);
    t2.rotateY(-.01);
    t2.setPosition(0,0,60 + Math.cos(z * 5) * 20);

    ctx.clearRect(0,0, canvas.width,canvas.height);
    t1.draw(ctx);
    t2.draw(ctx);

}
