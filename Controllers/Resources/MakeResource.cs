using System.Collections.Generic;
using System.Collections.ObjectModel;
using vega_aspnetcore_angular.Models;

namespace vega_aspnetcore_angular.Controllers.Resources
{
    public class MakeResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelResource> Models { get; set; }

        public MakeResource()
        {
            Models = new Collection<ModelResource>();
        }
    }
}