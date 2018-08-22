using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core.Models;
using vega_aspnetcore_angular.Persistence;

namespace vega_aspnetcore_angular.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }


        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            return await context.Makes
                .Include(m => m.Models)
                .ProjectTo<MakeResource>(mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}