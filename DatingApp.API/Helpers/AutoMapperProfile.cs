using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using DatingApp.API.Helpers;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDTO>().ForMember(
                dest => dest.PhotoUrl, src => 
                    src.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
                
            CreateMap<User, UserForDetailDTO>().ForMember(
                dest => dest.PhotoUrl, src => 
                    src.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotosForDetailsDTO>();
        }
    }
}