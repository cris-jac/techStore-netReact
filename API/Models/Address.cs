namespace API.Models;

public class Address
{
    public string FullName { get; set; }
    public string StreetName { get; set; }
    public int StreetNumber { get; set; }
    public string AdditionalInfo { get; set; }
    public string PostalCode { get; set; }
    public string Locality { get; set; }
    public string Province { get; set; }
    public string Country { get; set; }
}