using System.Threading.Tasks;

namespace vega_aspnetcore_angular.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}