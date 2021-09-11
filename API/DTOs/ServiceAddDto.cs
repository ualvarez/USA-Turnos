using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ServiceAddDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
            
        public int AppUserId { get; set; }

    }

}