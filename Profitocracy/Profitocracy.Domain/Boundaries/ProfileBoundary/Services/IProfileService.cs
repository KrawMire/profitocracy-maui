using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Services;

public interface IProfileService
{
	Task<Profile> Create(Profile profile);
	Task<Profile?> GetCurrentProfile();
}