export class Availability {
    public date: Date
    public startTime: Date
    public endTime: Date

    constructor(date: Date, startTime: Date, endTime: Date){
        this.date = date
        this.startTime = startTime
        this.endTime = endTime
    }
}