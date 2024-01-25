namespace API.DTOs;

public class GetPreferenceDto
{
    public BackUrls back_urls { get; set; }
    public long client_id { get; set; }
    public int collector_id { get; set; }
    public DateTime date_created { get; set; }
    public string id { get; set; }
    public string init_point { get; set; }
    public List<ResponsePreferenceItem> items { get; set; }
    public string marketplace { get; set; }
    public int marketplace_fee { get; set; }
    public string statement_descriptor { get; set; }
    public string sandbox_init_point { get; set; }
}


public class ResponsePreferenceItem
{
    public string id { get; set; }
    public string currency_id { get; set; }
    public string title { get; set; }
    public string picture_url { get; set; }
    public string description { get; set; }
    public int quantity { get; set; }
    public double unit_price { get; set; }
}
