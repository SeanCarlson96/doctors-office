export class Availability {
    public id: number
    public startTime: Date | null
    public endTime: Date | null

    constructor(id: number, startTime: Date | null, endTime: Date | null){
        this.id = id
        this.startTime = startTime
        this.endTime = endTime
    }
}