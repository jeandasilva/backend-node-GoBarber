import Appointment from '../models/Appointment';
import appointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {

    provider: String;

    date: Date;
}

class CreateAppointmentService {
    
    constructor() {
        

    }
    public execute({ date, provider }: RequestDTO): Appointment {

        const  appointmentDate = startOfHour(parsedDate);

        const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

        if(findAppointmentInSameDate){
            throw Error('this appointment is already booked ');
            
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;