using System;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core.Models;
using vega_aspnetcore_angular.Core;
using System.Collections.Generic;

namespace vega_aspnetcore_angular.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(
            IMapper mapper,
            IVehicleRepository vehicleRepository,
            IUnitOfWork unitOfWork)
        {
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<VehicleResource>> GetAllVehicles(FilterResource filterResource)
        {
            var filter = mapper.Map<Filter>(filterResource);
            return await vehicleRepository.GetAllVehicleResource(filter);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource saveVehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = mapper.Map<Vehicle>(saveVehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            vehicleRepository.Add(vehicle);
            await unitOfWork.CompleteAsync();

            var result = await vehicleRepository.GetVehicleResource(vehicle.Id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource saveVehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await vehicleRepository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            mapper.Map(saveVehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync();

            var result = await vehicleRepository.GetVehicleResource(vehicle.Id);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            vehicleRepository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicleResource = await vehicleRepository.GetVehicleResource(id);

            if (vehicleResource == null)
                return NotFound();

            return Ok(vehicleResource);
        }
    }
}