using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
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

        public async Task<IdentityResult> CreateAsync(User u)
        {
            var user = new User
            {
                Email = u.Email,
                Password = u.Password,
                Id = u.Id,
                HolidayTime = DateTime.Now,
                BusinessTrip = false,
                EmailConfirmed = u.EmailConfirmed,
                UserName = u.Email
            };
            var result = await _applicationUserManager.CreateAsync(user, u.Password);
            if (result.Succeeded)
            {
                // создаем claim для хранения года рождения
                var identityClaim = new IdentityUserClaim { ClaimType = ClaimTypes.Role, ClaimValue = "user" };
                // добавляем claim пользователю
                user.Claims.Add(identityClaim);
                // сохраняем изменения
                result = await _applicationUserManager.UpdateAsync(user);
                return result;
            }
            return result;
        }

        public async Task<User> FindAsync(string email,string password)
        {
            var user = await _applicationUserManager.FindByEmailAsync(email);
            var check = await _applicationUserManager.CheckPasswordAsync(user,password);
            if (check)
            {
                return user;
            }
            return (User) null;
        }

        public async Task<User> FindAsync(UserLoginInfo userLoginInfo)
        {
            return await _applicationUserManager.FindAsync(userLoginInfo);
        }

        public async Task<ClaimsIdentity> CreateIdentityAsync(User user, string authenticationType)
        {
            return await _applicationUserManager.CreateIdentityAsync(user, authenticationType);
        }

        public async Task<User> FindByIdAsync(string id)
        {
            return await _applicationUserManager.FindByIdAsync(id);
        }

        public async Task<IdentityResult> AddPasswordAsync(string userId, string newPassword)
        {
            return await _applicationUserManager.AddPasswordAsync(userId, newPassword);
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo userInfo)
        {
            return await _applicationUserManager.AddLoginAsync(userId, userInfo);
        }

        public async Task<IdentityResult> RemovePasswordAsync(string userId)
        {
            return await _applicationUserManager.RemovePasswordAsync(userId);
        }

        public async Task<IdentityResult> RemoveLoginAsync(string userId, UserLoginInfo userInfo)
        {
            return await _applicationUserManager.RemoveLoginAsync(userId, userInfo);
        }

        public async Task<List<User>> ShowAsync()
        {
            return await _applicationUserManager.Users.ToListAsync();
        }

        public async Task<IdentityResult> AddClaimToUserAsync(string email, string claimName)
        {
            var user = await _applicationUserManager.FindByEmailAsync(email);
            return await _applicationUserManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, claimName));
        }

        public async Task<IdentityResult> ChangePasswordAsync(string id, string currentPassword, string newPassword)
        {
            return await 
                _applicationUserManager.ChangePasswordAsync(
                    _applicationUserManager.FindById(id).Id, currentPassword, newPassword);
        }
    }
}