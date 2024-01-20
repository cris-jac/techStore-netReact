namespace API.DTOs;

public class CartItemDto
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public double PriceInARS { get; set; }
    public string PictureUrl { get; set; }
    public string Category { get; set; }
    public string Brand { get; set; }
    public int Quantity { get; set; }
}