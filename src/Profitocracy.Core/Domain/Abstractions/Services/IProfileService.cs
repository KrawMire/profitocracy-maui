using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Domain.Abstractions.Services;

public interface IProfileService
{
	Task<Profile?> GetCurrentProfile();
}