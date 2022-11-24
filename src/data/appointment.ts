export class Appointment {
    public id: number
    public doctor: string
    public patient: string

    constructor(id: number, doctor: string, patient: string){
        this.id = id
        this.doctor = doctor
        this.patient = patient
    }
}