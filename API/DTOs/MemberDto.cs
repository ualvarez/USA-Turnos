using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

          public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }

           public string Email { get; set; }
 
        public ICollection<ServiceDto> Services { get; set; }
        public ICollection<UserPhotoDto> Photos { get; set; }
    }
}