using Profitocracy.Domain.Boundaries.Common;

namespace Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;

public class Category(Guid id): AggregateRoot<Guid>(id)
{
	public required Guid ProfileId { get; set; }
	public required string Name { get; set; }
	public decimal? PlannedAmount { get; set; }
}