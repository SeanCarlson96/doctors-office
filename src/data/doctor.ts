import { Appointment } from "./appointment"
import { Availability } from "./availability"

export class Doctor {
    public id: number
    public name: string
    public availability: Availability
    public appointments: Appointment

    constructor(id: number, name: string, availability: Availability, appointments: Appointment){
        this.id = id
        this.name = name
        this.availability = availability
        this.appointments = appointments
    }
}