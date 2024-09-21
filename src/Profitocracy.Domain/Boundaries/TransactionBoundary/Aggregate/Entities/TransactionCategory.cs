using Profitocracy.Domain.Boundaries.Common;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;

public class TransactionCategory(Guid categoryId) : Entity<Guid>(categoryId)
{
	public required string Name { get; set; }
}