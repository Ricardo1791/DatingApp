using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddAplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static int CalculateAge(this DateTime DateOfBirth)
        {
            var age = DateTime.Today.Year - DateOfBirth.Year;

            if (DateOfBirth.AddYears(age) > DateTime.Today)
                age --;

            return age;
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}