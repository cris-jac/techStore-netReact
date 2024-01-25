namespace API.DTOs;

public class PreferenceItemDto
{
    public string title { get; set; }
    public string description { get; set; }
    public string picture_url { get; set; }
    public string category_id { get; set; } = "computing";
    public int quantity { get; set; }
    public string currency_id { get; set; } = "ARS";
    public decimal unit_price { get; set; }
}