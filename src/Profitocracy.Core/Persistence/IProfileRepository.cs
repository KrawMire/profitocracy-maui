using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Persistence;

/// <summary>
/// Provides operations for working with
/// persistence layer for profiles
/// </summary>
public interface IProfileRepository
{
	/// <summary>
	/// 
	/// </summary>
	/// <returns></returns>
	Task<Guid?> GetCurrentProfileId();
	
	/// <summary>
	/// 
	/// </summary>
	/// <returns></returns>
	Task<Profile?> GetCurrentProfile();
	
	/// <summary>
	/// 
	/// </summary>
	/// <param name="profile"></param>
	/// <returns></returns>
	Task<Profile> Create(Profile profile);
	
	/// <summary>
	/// 
	/// </summary>
	/// <param name="profile"></param>
	/// <returns></returns>
	Task<Profile> Update(Profile profile);
}