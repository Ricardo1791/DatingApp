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
            CreateMap<UserForUpdateDTO, User>();
            CreateMap<Photo, PhotoFromReturnDTO>();
            CreateMap<Photo, PhotoForCreationDTO>().ReverseMap();
            CreateMap<UserForRegisterDTO, User>();
            CreateMap<MessageForCreationDTO, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDTO>().ForMember(m => m.SenderPhotoUrl, 
                opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, 
                opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));

            
        }
    }
}