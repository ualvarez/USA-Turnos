using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ServicesController : BaseApiController
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly IMapper _mapper;
        public ServicesController(IServiceRepository serviceRepository, IMapper mapper)
        {
            _mapper = mapper;
            _serviceRepository = serviceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetServices()
        {
            var services = await _serviceRepository.GetServicesDtoAsync();
           
            return Ok(services);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<ServiceDto>> GetService(string username)
        {
            return await _serviceRepository.GetServiceDtoByNameAsync(username);
        }

    }
}