using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IServiceRepository
    {
         void Update(Service user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Service>> GetAsync();

        Task<Service> GetByIdAsync(int id);

        Task<Service> GetByNameAsync(string name);

        Task<IEnumerable<ServiceDto>> GetServicesDtoAsync();

        Task<ServiceDto> GetServiceDtoByNameAsync(string name);
    }
}