import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {

    provider: string;

    date: Date;
}

/**
 * Depency inversion (SOLID)
 * 
 */

class CreateAppointmentService {
    
    private appointmentsRepository: AppointmentsRepository;
    
    constructor(appointmentsRepository: AppointmentsRepository) {
        
        this.appointmentsRepository = appointmentsRepository;

    }
    
    public execute({ date, provider }: Request): Appointment {

        const  appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error('this appointment is already booked ');
            
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;