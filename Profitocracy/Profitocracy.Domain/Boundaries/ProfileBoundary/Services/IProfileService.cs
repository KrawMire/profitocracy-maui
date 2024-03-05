using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Services;

public interface IProfileService
{
	Task<Guid?> GetCurrentProfileId();
	Task<Profile?> GetCurrentProfile();
	Task<Profile> Create(Profile profile);
}