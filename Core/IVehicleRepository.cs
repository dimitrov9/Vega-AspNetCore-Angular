using System.Threading.Tasks;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<VehicleResource> GetVehicleResource(int id);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}