using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserForListDTO>>> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersDTO = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            return usersDTO.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserForDetailDTO>> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            if (user == null){
                return BadRequest();
            }

            var userDTO = _mapper.Map<UserForDetailDTO>(user);

            return userDTO;
        }
    }
}