using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<Appointment> GetAppointment(DateTime date, int serviceId);
        Task<IEnumerable<AppointmentDto>> GetAppointmentsDtoByService(int serviceId);

        void AddAppointment(Appointment appointment);

        Task<bool> SaveAllAsync();




    }
}