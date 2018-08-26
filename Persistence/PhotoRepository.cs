using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public PhotoRepository(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public async Task<IEnumerable<PhotoResource>> GetPhotoResources(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ProjectTo<PhotoResource>(mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}