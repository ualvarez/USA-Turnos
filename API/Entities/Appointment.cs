using System;
using System.ComponentModel.DataAnnotations;
using API.Enums;

namespace API.Entities
{
    public class Appointment
    {
       

        public DateTime Date { get; set; }


        public Service Service { get; set; }

        public int ServiceId { get; set; }

       
        public AppointmentStatus Status { get; set; }

        public AppUser AppUser { get; set; }

        public Nullable<int> AppUserId { get; set; }




    }
}