namespace API.Extensions
{
    using System.Security.Claims;
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            //ClaimTyes.Name represent a uniqueName that was setted in our token (see TokenService.cs)
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

          public static int GetUserId(this ClaimsPrincipal user)
        {
            //ClaimTyes.NameIdentifier represent a NameId that was setted in our token (see TokenService.cs)
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
        
    }
}