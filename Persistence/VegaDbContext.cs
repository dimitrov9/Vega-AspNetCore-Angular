using Microsoft.EntityFrameworkCore;
using vega_aspnetcore_angular.Models;

namespace vega_aspnetcore_angular.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
        { }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }

    }
}