using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Domain.Abstractions.Services;

/// <summary>
/// Defines operations related to core calculations
/// </summary>
public interface ICalculationService
{
	/// <summary>
	/// Get current profile with calculated
	/// transactions for current period
	/// </summary>
	/// <returns>Current profile</returns>
	Task<Profile?> GetCurrentProfile();
}