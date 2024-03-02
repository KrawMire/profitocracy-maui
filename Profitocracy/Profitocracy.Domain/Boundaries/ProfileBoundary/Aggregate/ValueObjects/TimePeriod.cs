namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public class TimePeriod
{
    public required DateTime DateFrom { get; set; }
    public required DateTime DateTo { get; set; }
}