using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Domain.Abstractions.Services;

/// <summary>
/// IProfileService defines core
/// operations related for profile
/// </summary>
public interface IProfileService
{
	/// <summary>
	/// Get current profile with calculated
	/// transactions for current period
	/// </summary>
	/// <returns>Current profile</returns>
	Task<Profile?> GetCurrentProfile();

	/// <summary>
	/// Get profile for specified period of transactions
	/// </summary>
	/// <param name="dateFrom">Start date of period</param>
	/// <param name="dateTo">End date of period</param>
	/// <returns>Current profile with calculated transactions for specified period</returns>
	Task<Profile?> GetCurrentProfileForPeriod(DateTime dateFrom, DateTime dateTo);
}