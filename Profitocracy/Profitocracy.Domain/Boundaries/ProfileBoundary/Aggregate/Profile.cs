using Profitocracy.Domain.Boundaries.Common;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

public class Profile(Guid id) : AggregateRoot<Guid>(id)
{
	public required string Name { get; set; }
	public required AnchorDate StartDate { get; set; }
	public required decimal Balance { get; set; }
	public required decimal SavedAmount { get; set; }
	public required ProfileExpenses ExpensesBalances { get; set; }
	public required List<ProfileCategory> CategoriesBalances { get; set; }
	public required ProfileSettings Settings { get; set; }
}