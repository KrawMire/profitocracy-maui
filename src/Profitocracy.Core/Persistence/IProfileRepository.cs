using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Persistence;

public interface IProfileRepository
{
	Task<Guid?> GetCurrentProfileId();
	Task<Profile?> GetCurrentProfile();
	Task<Profile> Create(Profile profile);
	Task<Profile> Update(Profile profile);
}