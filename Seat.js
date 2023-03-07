const DX = [3, 8 ,13 ,19, 24 ,29]

export default class Seat {
    constructor(index, owner){
        this.reset(index)
        this.owner = owner
    }

    reset(index){
        this.index = index
        this.r = Math.floor(this.index/6)
        this.c = this.index%6
        this.repositon()
    }

    resize(stageWidth, stageHeight){
        this.width = stageWidth/8
        this.height = this.width/2
        this.repositon()
    }

    repositon(){
        this.x = DX[this.c] * this.width / 4
        this.y = (this.r+1) * 3 * this.width / 4
    }

    animate(ctx){
        console.log()
        ctx.strokeRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height)
        ctx.font = this.width/4+'px 메이플스토리 Light'
        ctx.fillText(this.owner, this.x, this.y+this.height/6)
        ctx.strokeText(this.owner, this.x, this.y+this.height/6)
    }
}

export const init_seat = () => {
    let current = ["김남우", "신세영", "최동우", "박하윤", "신현탁", "전대현", "김민구", "박소윤", "성제현", "정은경", "방정우", "박진희", "노창현", "공정민", "정영록", "김은비", "신성환", "이진형", "서정희", "홍정현", "서이현", "양불회", "유혜민", ""]
    let seats = []
    for(let i=0; i<current.length; i++){
        seats.push(new Seat(i, current[i]))
    }
    return seats
}

export const change_seat = (seats) => {
    let blank = seats.pop()
    for(let i=0; i<seats.length; i++){
        let j = Math.floor(Math.random()*seats.length)
        while(i == j){
            j = Math.floor(Math.random()*seats.length)
        }
        let tmp = seats[i]
        seats[i] = seats[j]
        seats[j] = tmp

        seats[i].reset(i)
        seats[j].reset(j)
    }
    seats.push(blank)
    return seats
}
