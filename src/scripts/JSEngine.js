const lens = 200;
let centerX = 100, centerY = 100;

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
        const v = new Vertex(x,y,z);
        v.setOffset(this.x, this.y, this.z);
        this.vertexList[this.vertexList.length] = v;
    }

    addTriangle(i0, i1, i2) {
        this.trisList[this.trisList.length] = new Triangle(i0,i1,i2);
    }

    draw(ctx) {
        for(let i = 0; i < this.trisList.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.vertexList[this.trisList[i].getVerts().v1].getDisplayPoints().x, this.vertexList[this.trisList[i].getVerts().v1].getDisplayPoints().y);
            ctx.lineTo(this.vertexList[this.trisList[i].getVerts().v2].getDisplayPoints().x, this.vertexList[this.trisList[i].getVerts().v2].getDisplayPoints().y);
            ctx.lineTo(this.vertexList[this.trisList[i].getVerts().v3].getDisplayPoints().x, this.vertexList[this.trisList[i].getVerts().v3].getDisplayPoints().y);
            ctx.lineTo(this.vertexList[this.trisList[i].getVerts().v1].getDisplayPoints().x, this.vertexList[this.trisList[i].getVerts().v1].getDisplayPoints().y);
            ctx.stroke();
            ctx.closePath();
        }
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

class Vertex {

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

    getDisplayPoints() {
        const scale = lens / (this.z + this.zOff);

        return {

            x: (this.x + this.xOff) * scale + centerX,
            y: (this.y + this.yOff) * scale + centerY

        };

    }

}