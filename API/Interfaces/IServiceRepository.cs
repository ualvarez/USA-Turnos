using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IServiceRepository
    {
         void Update(Service user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Service>> GetAsync();

        Task<Service> GetByIdAsync(int id);

        Task<Service> GetByNameAsync(string name);

        Task<PagedList<ServiceDto>> GetServicesDtoAsync(ServiceParams serviceParams);

        Task<ServiceDto> GetServiceDtoByNameAsync(string name);

        void Add(Service service);

    }
}