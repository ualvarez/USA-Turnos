using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
          public int Id { get; set; }
        public string UserName { get; set; }

        public string PhotoUrl { get; set; }

         public DateTime Created { get; set; } 
        public DateTime LastActive { get; set; } 

        public ICollection<Service> Services { get; set; }

        public ICollection<UserPhotoDto> Photos { get; set; }
    }
}