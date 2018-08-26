using System.Collections.Generic;
using System.Threading.Tasks;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<PhotoResource>> GetPhotoResources(int vehicleId);
    }
}