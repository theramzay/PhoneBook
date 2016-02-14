using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Infrastructure
{
    public class MainUserManager : IMainUserManager
    {
        private readonly ApplicationUserManager _applicationUserManager;

        public MainUserManager(ApplicationUserManager applicationUserManager)
        {
            _applicationUserManager = applicationUserManager;
        }

        public async Task<IdentityResult> CreateAsync(string email, string password, bool isConfirmed = false)
        {
            var r = new Random();
            var u = new User
            {
                Email = email,
                Password = password,
                Id = r.Next(1000000).ToString(),
                HolidayTime = DateTime.Now,
                BusinessTrip = false,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = true,
                LockoutEndDateUtc = DateTime.Now,
                LockoutEnabled = false,
                AccessFailedCount = 1,
                UserName = email
            };
            return await _applicationUserManager.CreateAsync(u, password);
        }

        public async Task<List<User>> ShowAsync()
        {
            return await _applicationUserManager.Users.ToListAsync();
        }

        public async Task<IdentityResult> ChangePasswordAsync(string email, string currentPassword, string newPassword)
        {
            return await 
                _applicationUserManager.ChangePasswordAsync(
                    _applicationUserManager.FindByEmailAsync(email).Id.ToString(), currentPassword, newPassword);
        }
    }
}