using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Model.Profiles;
using Profitocracy.Core.Persistence;

namespace Profitocracy.Core.Domain.Services;

internal class ProfileService : IProfileService
{
    private readonly IProfileRepository _profileRepository;

    public ProfileService(IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }

    public async Task<Profile> SetCurrentProfile(Guid profileId)
    {
        var profiles = await _profileRepository.GetAllProfiles();

        foreach (var profile in profiles)
        {
            var isCurrent = profile.Id == profileId;

            if (isCurrent == profile.IsCurrent)
            {
                continue;
            }
            
            profile.IsCurrent = isCurrent;
            await _profileRepository.Update(profile);
        }
        
        var currentProfile = await _profileRepository.GetCurrentProfile();

        if (currentProfile is null)
        {
            throw new NullReferenceException("An error occurred while setting current profile.");
        }
        
        return currentProfile;
    }
}