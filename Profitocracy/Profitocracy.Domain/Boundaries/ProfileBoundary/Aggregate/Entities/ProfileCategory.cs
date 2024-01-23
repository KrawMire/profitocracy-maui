using Profitocracy.Domain.Boundaries.Common;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.Entities;

public class ProfileCategory(Guid categoryId) : Entity<Guid>(categoryId)
{
	public required string Name { get; set; }
	public required decimal ActualAmount { get; set; }
	public decimal? PlannedAmount { get; set; }
}