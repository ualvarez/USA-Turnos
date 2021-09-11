using System.Collections.Generic;

namespace API.DTOs
{
    public class ServiceDto
    {
          public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PhotoUrl { get; set; }


       public ICollection<ServicePhotoDto> Photos { get; set; }
    }
}