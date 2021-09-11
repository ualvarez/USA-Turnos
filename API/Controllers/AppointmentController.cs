using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IServiceRepository _serviceRepository;
        public AppointmentController(IAppointmentRepository appointmentRepository, IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
            _appointmentRepository = appointmentRepository;
        }

        [HttpPost()]
        public async Task<ActionResult> AddAppointment(DateTime date, string serviceName)
        {

          var service = await _serviceRepository.GetByNameAsync(serviceName);
            
            if(service == null)
             return BadRequest("El servicio no existe!");

            Appointment appointment = new Appointment()
            {
                Date = date,
                ServiceId = service.Id,
                Status = Enums.AppointmentStatus.available
            };

            _appointmentRepository.AddAppointment(appointment);

            if (await _appointmentRepository.SaveAllAsync()) return Ok();

            return BadRequest("Error al agregar el turno");
        }

        [HttpGet]
        public async Task<ActionResult<Appointment>> GetAppointment(DateTime date, string serviceName)
        {
            var service = await _serviceRepository.GetByNameAsync(serviceName);
            
            if(service == null)
             return BadRequest("El servicio no existe!");

            return await _appointmentRepository.GetAppointment(date, service.Id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAppointmentsByService(string serviceName)
        {
            var service = await _serviceRepository.GetByNameAsync(serviceName);
            
            if(service == null)
             return BadRequest("El servicio no existe!");

            var appointments = await _appointmentRepository.GetAppointmentsDtoByService(service.Id);

            return Ok(appointments);
        }
    }
}