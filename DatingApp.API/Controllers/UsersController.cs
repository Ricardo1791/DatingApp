using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LoginUserActivity))]
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
        public async Task<ActionResult<List<UserForListDTO>>> GetUsers([FromQuery] UserParams userParams)
        {   
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);

            var usersDTO = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return usersDTO.ToList();
        }

        [HttpGet("{id}",Name ="GetUser")]
        public async Task<ActionResult<UserForDetailDTO>> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            if (user == null){
                return BadRequest();
            }

            var userDTO = _mapper.Map<UserForDetailDTO>(user);

            return userDTO;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, UserForUpdateDTO model)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(model,userFromRepo);

            if(await _repo.SaveAll()){
                return NoContent();
            }else{
                return BadRequest($"Updating user {id} failed on save");
            }
        }
    }
}