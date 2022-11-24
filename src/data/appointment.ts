export class Appointment {
    public id: number
    public doctor: string
    public patient: string
    public start: Date
    public end: Date

    constructor(id: number, doctor: string, patient: string, start: Date, end: Date){
        this.id = id
        this.doctor = doctor
        this.patient = patient
        this.start = start
        this.end = end
    }
}