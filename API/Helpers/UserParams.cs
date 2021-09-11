namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get; set;} =1;

        private int _pageSize = 10;

        public int PageSize{
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }

        public string  ServiceName { get; set; }

        public string OrderBy { get; set; } = "lastActive";

    }
}