import { Appointment } from "./appointment"
import { Availability } from "./availability"

export class Doctor {
    public id: number
    public name: string
    public availability: Availability[] = []
    public appointments: Appointment[] = []
    public username: string
    public password: string

    constructor(id: number, name: string, availability: Availability[], appointments: Appointment[], username: string, password: string){
        this.id = id
        this.name = name
        this.availability = availability
        this.appointments = appointments
        this.username = username
        this.password = password
    }
}