using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core;

namespace vega_aspnetcore_angular.Controllers
{
    [Route("/api/admin")]
    public class AdminController : Controller
    {
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        public AdminController(IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;
        }

        public async Task<IEnumerable<ChartDataResource>> GetChartData()
        {
            return await vehicleRepository.GetChartData();
        }
    }
}