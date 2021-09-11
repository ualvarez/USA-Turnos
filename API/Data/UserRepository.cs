using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<AppUser>> GetAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(s => s.Services)
            .ToListAsync();
        }

        public async Task<AppUser> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetByNameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(s => s.Services)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            IQueryable<AppUser> users;

            if (string.IsNullOrEmpty(userParams.ServiceName))
            {
                users = _context.Users.Include(u => u.Services);
            }
            else
            {
                users = _context.Users.Include(u => u.Services)
                     .Where(user => user.Services.Select(service => service.Name.ToLower()).Contains(userParams.ServiceName.ToLower()));
            }

            users = userParams.OrderBy switch
            {
                "created" => users.OrderByDescending(u => u.Created),
                _ => users.OrderByDescending(u => u.LastActive)
                
            };

            return await PagedList<MemberDto>.CreateAsync(users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}