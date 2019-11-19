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

/*functions*/

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
            const n = this.calcNormals(i);
            const v1 = this.vertexList[this.trisList[i].getVerts().v1];
            const v2 = this.vertexList[this.trisList[i].getVerts().v2];
            const v3 = this.vertexList[this.trisList[i].getVerts().v3];
            
            if(VectorMultiplication(n, new Vector(v1.x + v1.xOff + v2.x + v2.xOff + v3.x + v3.xOff,
                v1.y + v1.yOff + v2.y + v2.yOff + v3.y + v3.yOff,
                v1.z + v1.zOff + v2.z + v2.zOff + v3.z + v3.zOff,)) > 0) {

                ctx.beginPath();
                ctx.moveTo(v1.getDisplayPoints().x, v1.getDisplayPoints().y);
                ctx.lineTo(v2.getDisplayPoints().x, v2.getDisplayPoints().y);
                ctx.lineTo(v3.getDisplayPoints().x, v3.getDisplayPoints().y);
                ctx.lineTo(v1.getDisplayPoints().x, v1.getDisplayPoints().y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    calcNormals(index) {
        const v1 = VectorSubtraction(this.vertexList[this.trisList[index].getVerts().v2], this.vertexList[this.trisList[index].getVerts().v1]);
        const v2 = VectorSubtraction(this.vertexList[this.trisList[index].getVerts().v3], this.vertexList[this.trisList[index].getVerts().v1]);

        const n = new Vector(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x);

        return n;

    }

}

class Triangle {

    constructor(v1,v2,v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    getVerts() {

        return {
            v1:this.v1,
            v2:this.v2,
            v3:this.v3
        }

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