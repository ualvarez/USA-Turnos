using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AppointmentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Appointment> GetAppointment(DateTime date, int serviceId)
        {
            return await _context.Appointments.FindAsync(date, serviceId);
        }

        public async Task<IEnumerable<AppointmentDto>> GetAppointmentsDtoByService(int serviceId)
        {
            return await _context.Appointments.Where(a => a.ServiceId == serviceId).OrderBy(a => a.Date).ProjectTo<AppointmentDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public void AddAppointment(Appointment appointment){
            _context.Add<Appointment>(appointment);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}