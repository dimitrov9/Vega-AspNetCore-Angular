using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace vega_aspnetcore_angular.Core
{
    public interface IPhotoStorage
    {
        Task<string> UploadPhoto(string uploadsFolderPath, IFormFile file);
    }
}