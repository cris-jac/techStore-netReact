namespace API.Models.OrderAggregate;

public class ProductItemOrdered
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
}