using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;

public interface IProfileRepository
{
	Task<Guid?> GetCurrentProfileId();
	Task<Profile?> GetCurrentProfile();
	Task<Profile> Create(Profile profile);
	Task<Profile> Update(Profile profile);
}