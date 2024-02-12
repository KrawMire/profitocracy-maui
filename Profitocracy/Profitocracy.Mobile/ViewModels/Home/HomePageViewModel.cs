using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.ViewModels.Common;

namespace Profitocracy.Mobile.ViewModels.Home;

public class HomePageViewModel : ViewModelBase
{
    private ProfileModel? _profile;

    public ProfileModel? Profile
    {
        get => _profile;
        private set
        {
            if (_profile == value)
            {
                return;
            }

            _profile = value;
            OnPropertyChanged();
        }
    }
    
    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Profile, ProfileModel> _mapper;
    
    public HomePageViewModel(IProfileService profileService, IPresentationMapper<Profile, ProfileModel> mapper)
    {
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async void Initialize()
    {
        var currentProfile = await _profileService.GetCurrentProfile();

        if (currentProfile is not null)
        {
            Profile = _mapper.MapToModel(currentProfile);
        }
    }
}