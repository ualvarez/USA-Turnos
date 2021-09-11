using System.Collections.Generic;

namespace API.Entities
{
    public class Service
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<ServicePhoto> Photos { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

        public ICollection<Appointment> Appointments { get; set; }

    }
}