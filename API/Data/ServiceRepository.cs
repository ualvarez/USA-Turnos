using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
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

        public async Task<PagedList<ServiceDto>> GetServicesDtoAsync(ServiceParams serviceParams)
        {
            IQueryable<Service> services;

            if (!string.IsNullOrEmpty(serviceParams.Username))
            {
                services = _context.Services.Include(s => s.AppUser).Where(s => s.AppUser.UserName.ToLower() == serviceParams.Username.ToLower());
            }
            else
            {
                services = _context.Services;
            }

            services = serviceParams.OrderBy.ToLower() switch
            {
                "name" => services.OrderByDescending(s => s.Name),
                 "description" => services.OrderByDescending(s => s.Description),
                _ => services.OrderByDescending(s => s.Name)
            };


            return await PagedList<ServiceDto>.CreateAsync(services.ProjectTo<ServiceDto>(_mapper.ConfigurationProvider).AsNoTracking(), serviceParams.PageNumber, serviceParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Service service)
        {
            _context.Entry(service).State = EntityState.Modified;
        }

        public void Add(Service service)
        {
            _context.Services.Add(service);

        }

    }
}