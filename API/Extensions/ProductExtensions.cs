using API.Models;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

        query = orderBy switch
        {
            "price" => query.OrderBy(p => p.PriceInARS),
            "priceDesc" => query.OrderByDescending(p => p.PriceInARS),
            _ => query.OrderBy(p => p.Name)
        };

        return query;
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string categories)
    {
        List<string> brandList = new();
        List<string> categoryList = new();

        if (!string.IsNullOrEmpty(brands))
        {
            brandList.AddRange(brands.ToLower().Split(",").ToList());
        }

        if (!string.IsNullOrEmpty(categories))
        {
            categoryList.AddRange(categories.ToLower().Split(",").ToList());
        }

        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));

        query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.Category.ToLower()));

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;

        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(p => 
            p.Name.ToLower().Contains(lowerCaseSearchTerm) || 
            p.Brand.ToLower().Contains(lowerCaseSearchTerm) || 
            p.Category.ToLower().Contains(lowerCaseSearchTerm)
        );
    }

}