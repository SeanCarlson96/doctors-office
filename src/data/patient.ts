import { Appointment } from "./appointment"

export class Patient {
    public id: number
    public name: string
    public appointments: Appointment

    constructor(id: number, name: string, appointments: Appointment){
        this.id = id
        this.name = name
        this.appointments = appointments
    }
}