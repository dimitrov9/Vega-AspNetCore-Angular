using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Persistence;

namespace vega_aspnetcore_angular.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
            return await context.Features
                .ProjectTo<FeatureResource>(mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}