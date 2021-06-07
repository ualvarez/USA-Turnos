namespace API.Errors
{
    public class ApiException
    {
       
        public string Message { get; set; }
        public int StatusCode { get; set;}

         public string Details { get; set; }
        public ApiException(int statusCode, string message = null, string details = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
    }
}