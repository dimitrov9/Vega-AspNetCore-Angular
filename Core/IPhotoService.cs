using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Core
{
    public interface IPhotoService
    {
        Task<Photo> PhotoUpload(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}