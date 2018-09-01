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
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PhotosController(
            IHostingEnvironment host,
            IVehicleRepository vehicleRepository,
            IPhotoRepository photoRepository,
            IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options,
            IPhotoService photoService
            )
        {
            this.photosetting = options.Value;
            this.vehicleRepository = vehicleRepository;
            this.photoRepository = photoRepository;
            this.mapper = mapper;
            this.photoService = photoService;
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

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo = await photoService.PhotoUpload(vehicle, file, uploadsFolderPath);

            return Ok(mapper.Map<PhotoResource>(photo));
        }

        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            return await photoRepository.GetPhotoResources(vehicleId);
        }
    }
}