using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Model;

namespace Database.Repository
{
    public class Context:DbContext
    {
        public DbSet<UsersInfo> Users { get; set; }
        public DbSet<MoviesInfo> Movies { get; set; }
        public DbSet<Genres> Genres { get; set; }
        public DbSet<StarCast> StarCasts { get; set; }
        public DbSet<Notifications> Notifications{ get; set; }
        public DbSet<Reviews> Reviews{ get; set; }
        public DbSet<Roles> Roles{ get; set; }
        public DbSet<UserSearchHistory> SearchHistories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoviesInfo>()
                .HasMany(m => m.UsersWatchHistory)
                .WithMany(m => m.WatchHistory)
                .Map(m =>
                {
                    m.ToTable("WatchHistory");
                    m.MapLeftKey("MovieId");
                    m.MapRightKey("UserId");
                });
            modelBuilder.Entity<MoviesInfo>()
                .HasMany(m => m.UsersWatchLater)
                .WithMany(m => m.WatchLater)
                .Map(m =>
                {
                    m.ToTable("WatchLater");
                    m.MapLeftKey("MovieId");
                    m.MapRightKey("UserId");
                });
            modelBuilder.Entity<Notifications>()
             .HasKey(n => new { n.MovieId, n.ReceiverId, n.SenderId });

            modelBuilder.Entity<Notifications>()
                .HasRequired(n => n.Sender)
                .WithMany()
    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Notifications>()
                .HasRequired(n => n.Receiver)
                .WithMany()
    .WillCascadeOnDelete(false);


            modelBuilder.Entity<Reviews>()
           .HasKey(r => new { r.MovieId, r.UserId });



        }
    }
}
