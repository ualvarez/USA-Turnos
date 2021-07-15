using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ServiceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Service>> GetAsync()
        {
            return await _context.Services
            .Include(p => p.Photos)
            .ToListAsync();
        }

        public async Task<Service> GetByIdAsync(int id)
        {
            return await _context.Services.FindAsync(id);
        }

        public async Task<Service> GetByNameAsync(string name)
        {
            return await _context.Services
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.Name == name);
        }

      

        public async Task<ServiceDto> GetServiceDtoByNameAsync(string name)
        {
            return await _context.Services
            .Where(x => x.Name == name)
            .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ServiceDto>> GetServicesDtoAsync()
        {
           return await _context.Services
           .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Service service)
        {
            _context.Entry(service).State = EntityState.Modified;
        }
    }
}