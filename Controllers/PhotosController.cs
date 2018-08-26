using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        public readonly PhotoSettings photosetting;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IPhotoRepository photoRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PhotosController(
            IHostingEnvironment host,
            IVehicleRepository vehicleRepository,
            IPhotoRepository photoRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options
            )
        {
            this.photosetting = options.Value;
            this.vehicleRepository = vehicleRepository;
            this.photoRepository = photoRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.host = host;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file.");
            if (file.Length == 0) return BadRequest("Empty file.");
            if (file.Length > photosetting.MaxBytes) return BadRequest("File size is too big.");
            if (!photosetting.IsSupported(file.FileName))
                return BadRequest("Invalid file type.");

            var uploadsForlderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsForlderPath))
                Directory.CreateDirectory(uploadsForlderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsForlderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            // todo generate thumbnails
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<PhotoResource>(photo));
        }

        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            return await photoRepository.GetPhotoResources(vehicleId);
        }
    }
}