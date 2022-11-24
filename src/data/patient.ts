import { Appointment } from "./appointment"

export class Patient {
    public id: number
    public name: string
    public appointments: Appointment | null
    public username: string
    public password: string

    constructor(id: number, name: string, appointments: Appointment | null, username: string, password: string){
        this.id = id
        this.name = name
        this.appointments = appointments
        this.username = username
        this.password = password
    }
}