using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }

        [Required] public string Name { get; set; }

        [Required] public string Surname { get; set; }

        [Required] public string City { get; set; }

        [Required] public string Country { get; set; }

        [Required] public string Email { get; set; }

        [Required] public DateTime DateOfBirth { get; set; }

        public string PhoneNumber { get; set; }

        public string Interests { get; set; }


        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string  Password { get; set; }
    }
}