namespace API.Utilities;

public class ProductParams : PaginationParams
{
    public string SortBy { get; set; }
    public string SearchTerm { get; set; }
    public string Categories { get; set; }
    public string Brands { get; set; }
}