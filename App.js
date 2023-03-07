import Seat, {init_seat, change_seat} from "./Seat.js"

class App {
    constructor(){
        console.log("App 실행");
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.pixelRatio = devicePixelRatio > 1 ? 2 : 1;
        document.body.appendChild(this.canvas);

        this.seats = init_seat()
        this.resize()
        window.addEventListener("resize", this.resize.bind(this), false)
        this.isChange = false
        window.addEventListener("keydown", event =>{
            console.log(event)
            if (event.key == " "){
                this.isChange = !this.isChange
            }
        }, false)
        window.requestAnimationFrame(this.animate.bind(this));

    }
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.context.scale(this.pixelRatio, this.pixelRatio)
        for(let i=0; i<this.seats.length;i++){
            this.seats[i].resize(this.stageWidth, this.stageHeight)
        }
    }

    animate(){
        if (this.isChange){
            this.seats = change_seat.bind(this)(this.seats)
        }
        window.requestAnimationFrame(this.animate.bind(this));
        this.context.textAlign = "center"
        this.context.clearRect(0, 0, this.stageWidth, this.stageHeight)
        for(let i=0; i<this.seats.length;i++){
            this.seats[i].animate(this.context)
        }
        
        this.context.strokeText("스페이스 바", this.stageWidth/2, this.stageWidth*7/16 )
        if(!this.isChange){
            this.context.fillText("스페이스 바", this.stageWidth/2, this.stageWidth*7/16 )
        }
    }
}

window.onload = new App()