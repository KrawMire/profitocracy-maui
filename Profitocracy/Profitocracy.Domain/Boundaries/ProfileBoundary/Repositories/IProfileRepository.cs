using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;

public interface IProfileRepository
{
	Task<Profile> Create(Profile profile);
	Task<Profile?> GetCurrentProfile();
}