using System;

namespace DatingApp.API.DTOs
{
    public class PhotosForDetailsDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Descripcion { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}