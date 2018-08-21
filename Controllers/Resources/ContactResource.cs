using System.ComponentModel.DataAnnotations;

namespace vega_aspnetcore_angular.Controllers.Resources
{
    public class ContactResource
    {
        public string Name { get; set; }
        [StringLength(255)]
        public string Email { get; set; }

        [Required, StringLength(255)]
        public string Phone { get; set; }
    }
}