using System.Collections.Generic;
using System.Collections.ObjectModel;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Controllers.Resources
{
    public class MakeResource : KeyValuePairResource
    {
        public ICollection<KeyValuePairResource> Models { get; set; }

        public MakeResource()
        {
            Models = new Collection<KeyValuePairResource>();
        }
    }
}