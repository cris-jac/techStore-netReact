namespace API.DTOs;

public class ShoppingCartDto
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<CartItemDto> Items { get; set; }
}