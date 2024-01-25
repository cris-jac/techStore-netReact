namespace API.DTOs;

public class CreatePreferenceResponseDto
{
    public int collector_id { get; set; }
    public List<PreferenceItemDto> items { get; set; }
    public BackUrls back_urls { get; set; }
    public long client_id { get; set; }
    public string marketplace { get; set; }
    public int marketplace_fee { get; set; }
    public string statement_descriptor { get; set; }
    public DateTime date_created { get; set; }
    public string id { get; set; }
    public string init_point { get; set; }
    public string sandbox_init_point { get; set; }
}