using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Service> Services { get; set; }

        public DbSet<ServicePhoto> ServicesPhotos {get; set;}

        public DbSet<Appointment> Appointments { get; set; }
        
    }
}