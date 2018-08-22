using System.ComponentModel.DataAnnotations;

namespace vega_aspnetcore_angular.Core.Models
{
    public class Model
    {
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; }


        public Make Make { get; set; }
        public int MakeId { get; set; }
    }
}