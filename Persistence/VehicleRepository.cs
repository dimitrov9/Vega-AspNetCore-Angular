using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core;
using vega_aspnetcore_angular.Core.Models;
using vega_aspnetcore_angular.Extensions;

namespace vega_aspnetcore_angular.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public VehicleRepository(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<VehicleResource> GetVehicleResource(int id)
        {
            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .ProjectTo<VehicleResource>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<VehicleResource>> GetAllVehicleResource(VehicleQuery vehicleQuery)
        {
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();

            if (vehicleQuery.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == vehicleQuery.MakeId.Value);

            if (vehicleQuery.ModelId.HasValue)
                query = query.Where(v => v.ModelId == vehicleQuery.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };

            return await query
                .ApplyOrdering(vehicleQuery, columnsMap)
                .ProjectTo<VehicleResource>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

    }
}
