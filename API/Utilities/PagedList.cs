using Microsoft.EntityFrameworkCore;

namespace API.Utilities;

public class PagedList<T> : List<T>
{
    public MetaData MetaData { get; set; }
    // public List<T> Items { get; set; }
    // public List<T> Items { get; set; }
    // public MetaData MetaData { get; set; }

    public PagedList(
        IEnumerable<T> items,
        int count, 
        int pageNumber,
        int pageSize
    )
    {
        // Items = items;
        // MetaData = new MetaData
        // {
        //     TotalCount = count,
        //     PageSize = pageSize,
        //     CurrentPage = pageNumber,
        //     TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        // };

        MetaData = new MetaData
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        AddRange(items);
    }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = query.Count();
        
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}