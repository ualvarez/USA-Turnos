using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ServicesController : BaseApiController
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public ServicesController(IServiceRepository serviceRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _serviceRepository = serviceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetServices()
        {
            var services = await _serviceRepository.GetServicesDtoAsync();

            return Ok(services);
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<ServiceDto>> GetService(string name)
        {
            return await _serviceRepository.GetServiceDtoByNameAsync(name);
        }

        [HttpPut]
        public async Task<ActionResult> Update(ServiceUpdateDto serviceUpdateDto)
        {
            var service = new Service();

            _mapper.Map(serviceUpdateDto, service);           

            _serviceRepository.Update(service);

            if (await _serviceRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Ocurrió un error al actualizar el servicio"); 

        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<ServicePhotoDto>> AddPhoto(IFormFile file, [FromQuery] string name)
        {
            var service = await _serviceRepository.GetByNameAsync(name);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new ServicePhoto()
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (service.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            service.Photos.Add(photo);

            if (await _serviceRepository.SaveAllAsync())
                return _mapper.Map<ServicePhotoDto>(photo);

            return BadRequest("Ocurrió un problema al agregar la foto");
        }

         [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId,[FromQuery] string name){
            var service = await  _serviceRepository.GetByNameAsync(name);
            

            var photo = service.Photos.FirstOrDefault(x => x.Id == photoId);  

            if(photo.IsMain) return BadRequest("La foto indicada ya es principal");

            var currentMain = service.Photos.FirstOrDefault(x => x.IsMain);
            if(currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if(await _serviceRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Ocurrió un error al establecer la foto como principal");
        }

            [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId,[FromQuery] string name)
        {
            var service = await _serviceRepository.GetByNameAsync(name);

            var photo = service.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("No se puede eliminar la foto principal");

            if (photo.PublicId != null)
            {
               var result = await _photoService.DeletePhotoAsync(photo.PublicId);
               if(result.Error != null) return BadRequest(result.Error.Message);
            }

            service.Photos.Remove(photo);

            if(await _serviceRepository.SaveAllAsync()) return Ok();

            return BadRequest("Ocurrió un error al eliminar la foto");
        }

    }
}