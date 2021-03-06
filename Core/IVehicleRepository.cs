using System.Collections.Generic;
using System.Threading.Tasks;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<VehicleResource> GetVehicleResource(int id);
        Task<QueryResultResource<VehicleResource>> GetAllVehicleResource(VehicleQuery filter);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);

        Task<IEnumerable<ChartDataResource>> GetChartData();
    }
}