export class Appointment {
    public id: number
    public doctor: string
    public patient: string
    public start: Date
    public end: Date
    public confirmed: boolean

    constructor(id: number, doctor: string, patient: string, start: Date, end: Date, confirmed: boolean){
        this.id = id
        this.doctor = doctor
        this.patient = patient
        this.start = start
        this.end = end
        this.confirmed = confirmed
    }
}