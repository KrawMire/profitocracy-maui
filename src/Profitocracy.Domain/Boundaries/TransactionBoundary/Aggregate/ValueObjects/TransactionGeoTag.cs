namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

public class TransactionGeoTag
{
	public required double Longitude { get; set; }
	public required double Latitude { get; set; }
}