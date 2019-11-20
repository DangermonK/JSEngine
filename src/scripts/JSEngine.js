const lens = 200;
let centerX = 100, centerY = 100;

/*functions*/

function VectorSubtraction(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

function VectorAddition(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

function VectorMultiplication(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function CalculateNormal(v1, v2) {

    const n = new Vector(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x);

    return n;

}

/*functions*/

class Cube {

    constructor(x,y,z,w,h,l) {
        this.mesh = new Mesh(x,y,z);
        this.mesh.addVertex(1 * w, 1 * h, 1 * l);
        this.mesh.addVertex(-1 * w, 1 * h, 1 * l);
        this.mesh.addVertex(1 * w, -1 * h, 1 * l);
        this.mesh.addVertex(-1 * w, -1 * h, 1 * l);

        this.mesh.addVertex(1 * w, 1 * h, -1 * l);
        this.mesh.addVertex(-1 * w, 1 * h, -1 * l);
        this.mesh.addVertex(1 * w, -1 * h, -1 * l);
        this.mesh.addVertex(-1 * w, -1 * h, -1 * l);

        this.mesh.addTriangle(2, 1, 0);
        this.mesh.addTriangle(1, 2, 3);

        this.mesh.addTriangle(4, 2, 0);
        this.mesh.addTriangle(2, 4, 6);

        this.mesh.addTriangle(4, 5, 6);
        this.mesh.addTriangle(7, 6, 5);

        this.mesh.addTriangle(1, 3, 5);
        this.mesh.addTriangle(7, 5, 3);

        this.mesh.addTriangle(0, 1, 4);
        this.mesh.addTriangle(5, 4, 1);

        this.mesh.addTriangle(6, 3, 2);
        this.mesh.addTriangle(3, 6, 7);
    }

    setPosition(x,y,z) {
        this.mesh.setPosition(x,y,z);
    }

    movePosition(x,y,z) {
        this.mesh.movePosition(x,y,z);
    }

    rotateX(alpha) {
        this.mesh.rotateX(alpha);
    }


    rotateY(alpha) {
        this.mesh.rotateY(alpha);
    }


    rotateZ(alpha) {
        this.mesh.rotateZ(alpha);
    }

    draw(ctx) {
        this.mesh.draw(ctx);
    }

}

class Mesh {

    constructor(x,y,z) {
        this.trisList = [];
        this.vertexList = [];
        this.setPosition(x,y,z);
    }

    setPosition(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;

        for(let i = 0; i < this.vertexList.length; i++) {
            this.vertexList[i].setOffset(x,y,z);
        }
    }

    movePosition(x,y,z) {
        this.x += x;
        this.y += y;
        this.z += z;

        for(let i = 0; i < this.vertexList.length; i++) {
            this.vertexList[i].setOffset(this.x,this.y,this.z);
        }
    }

    rotateX(alpha) {
        for(let i = 0; i < this.vertexList.length; i++) {
            this.vertexList[i].rotateX(alpha);
        }
    }
    rotateY(alpha) {
        for(let i = 0; i < this.vertexList.length; i++) {
            this.vertexList[i].rotateY(alpha);
        }
    }
    rotateZ(alpha) {
        for(let i = 0; i < this.vertexList.length; i++) {
            this.vertexList[i].rotateZ(alpha);
        }
    }

    addVertex(x,y,z) {
        const v = new Vector(x,y,z);
        v.setOffset(this.x, this.y, this.z);
        this.vertexList[this.vertexList.length] = v;
    }

    addTriangle(i0, i1, i2) {
        this.trisList[this.trisList.length] = new Triangle(i0,i1,i2);
    }

    draw(ctx) {
        for(let i = 0; i < this.trisList.length; i++) {

            const v1 = this.vertexList[this.trisList[i].getVerts().v1];
            const v2 = this.vertexList[this.trisList[i].getVerts().v2];
            const v3 = this.vertexList[this.trisList[i].getVerts().v3];

            const n = CalculateNormal(VectorSubtraction(v2, v1), VectorSubtraction(v3, v1));

            if(VectorMultiplication(n, new Vector(v1.x + v1.xOff + v2.x + v2.xOff + v3.x + v3.xOff,
                v1.y + v1.yOff + v2.y + v2.yOff + v3.y + v3.yOff,
                v1.z + v1.zOff + v2.z + v2.zOff + v3.z + v3.zOff,)) > 0) {

                ctx.fillStyle = this.trisList[i].color;
                ctx.beginPath();
                ctx.moveTo(v1.getDisplayPoints().x, v1.getDisplayPoints().y);
                ctx.lineTo(v2.getDisplayPoints().x, v2.getDisplayPoints().y);
                ctx.lineTo(v3.getDisplayPoints().x, v3.getDisplayPoints().y);
                ctx.lineTo(v1.getDisplayPoints().x, v1.getDisplayPoints().y);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

class Triangle {

    constructor(v1,v2,v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;

        this.color = getRandomColor();
    }

    getVerts() {

        return {
            v1:this.v1,
            v2:this.v2,
            v3:this.v3
        }

    }

    flipNormal() {
        const v = this.v1;
        this.v1 = this.v3;
        this.v3 = v;
    }

}

class Vector {

    constructor(x,y,z) {
        this.setPosition(x,y,z);
    }

    setPosition(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setOffset(x,y,z) {
        this.xOff = x;
        this.yOff = y;
        this.zOff = z;
    }

    rotateX(alpha) {

        const yC = this.y;
        const zC = this.z;

        this.y = yC * Math.cos(alpha) - zC * Math.sin(alpha);
        this.z = yC * Math.sin(alpha) + zC * Math.cos(alpha);

    }

    rotateY(alpha) {

        const xC = this.x;
        const zC = this.z;

        this.x = xC * Math.cos(alpha) + zC * Math.sin(alpha);
        this.z = zC * Math.cos(alpha) - xC * Math.sin(alpha);

    }

    rotateZ(alpha) {

        const xC = this.x;
        const yC = this.y;

        this.x = xC * Math.cos(alpha) - yC * Math.sin(alpha);
        this.y = xC * Math.sin(alpha) + yC * Math.cos(alpha);

    }

    scale(factor) {

        this.x *= factor;
        this.y *= factor;
        this.z *= factor;

    }

    getDisplayPoints() {
        const scale = lens / (this.z + this.zOff);

        return {

            x: (this.x + this.xOff) * scale + centerX,
            y: (this.y + this.yOff) * scale + centerY

        };

    }

}