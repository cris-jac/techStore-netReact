namespace API.DTOs;

public class CreatePreferenceRequestDto
{
    public BackUrls back_urls { get; set; }
    public List<PreferenceItemDto> items { get; set; }
}


public class BackUrls
{
    public string failure { get; set; } = "https://www.dictionary.com/browse/failure";
    public string pending { get; set; } = "https://www.dictionary.com/browse/pending";
    public string success { get; set; } = "https://www.dictionary.com/browse/success";
}