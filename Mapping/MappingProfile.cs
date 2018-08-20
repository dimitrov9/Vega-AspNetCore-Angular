using AutoMapper;
using vega_aspnetcore_angular.Controllers.Resources;
using vega_aspnetcore_angular.Models;

namespace vega_aspnetcore_angular.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
        }
    }
}