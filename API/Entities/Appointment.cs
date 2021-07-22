using System;
using API.Enums;

namespace API.Entities
{
    public class Appointment
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public Service Service { get; set; }

    public AppointmentStatus Status { get; set; }

    public AppUser User { get; set; }




    }
}