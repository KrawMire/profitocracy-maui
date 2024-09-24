namespace Profitocracy.Core.Domain.Model.Profiles.ValueObjects;

public class Currency
{
	public required string Name { get; set; }
	public required string Code { get; set; }
	public required string Symbol { get; set; }
}