namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

/// <summary>
/// Settings of profile
/// </summary>
public struct ProfileSettings
{
	public required Currency Currency { get; set; }
}