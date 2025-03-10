using Profitocracy.Core.Domain.Model.Profiles;

namespace Profitocracy.Core.Domain.Abstractions.Services;

public interface IProfileService
{
    /// <summary>
    /// Sets the provided profile as the
    /// current profile in the application.
    /// </summary>
    /// <param name="profileId">The ID of the profile to be set as the current profile.</param>
    /// <returns>Returns the updated profile that is now marked as the current profile.</returns>
    Task<Profile> SetCurrentProfile(Guid profileId);
}