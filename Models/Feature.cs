using System.ComponentModel.DataAnnotations;

namespace vega_aspnetcore_angular.Models
{
    public class Feature
    {
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; }
    }
}