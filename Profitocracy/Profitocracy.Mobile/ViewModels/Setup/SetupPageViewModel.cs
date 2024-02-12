using System.Globalization;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.ViewModels.Common;

namespace Profitocracy.Mobile.ViewModels.Setup;

public class SetupPageViewModel : ViewModelBase
{
    private string _name = "";
    private decimal _initialBalance;

    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Profile, ProfileModel> _mapper;
    
    public SetupPageViewModel(IProfileService profileService, IPresentationMapper<Profile, ProfileModel> mapper)
    {
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value)
            {
                return;
            }
            
            _name = value;
            OnPropertyChanged();
        }
    }

    public string InitialBalance
    {
        get => _initialBalance.ToString(CultureInfo.InvariantCulture);
        set
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                _initialBalance = 0;
                OnPropertyChanged();
                return;
            }

            if (!decimal.TryParse(value, out var numValue))
            {
                Shell.Current.DisplayAlert(
                    "Invalid format", 
                    "Balance must be a number", 
                    "OK");
                OnPropertyChanged();
                return;
            }

            if (numValue == _initialBalance)
            {
                return;
            }

            _initialBalance = numValue;
            OnPropertyChanged();
        }
    }

    public async void CreateFirstProfile()
    {
        var profile = new ProfileModel
        {
            Name = _name,
            InitialBalance = _initialBalance,
            StartDate = DateTime.Now,
            IsCurrent = true
        };

        var domainProfile = _mapper.MapToDomain(profile);
        await _profileService.Create(domainProfile);
    }
}