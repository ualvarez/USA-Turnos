using System;
using API.Enums;

namespace API.DTOs
{
    public class AppointmentDto
    {
        public DateTime Date { get; set; }

        public int ServiceId { get; set; }

        public int AppUserId { get; set; }

        public AppointmentStatus Status { get; set; }
    }
}