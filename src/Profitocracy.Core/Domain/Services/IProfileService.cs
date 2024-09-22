using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Domain.Services;

public interface IProfileService
{
	Task<Profile?> GetCurrentProfile();
}