using System.Globalization;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;

namespace Profitocracy.Mobile.ViewModels.Setup;

public class SetupPageViewModel : BaseNotifyObject
{
    private string _name = "";
    private string _initialBalance;

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
        get => _initialBalance;
        set
        {
            _initialBalance = value;
            OnPropertyChanged();
        }
    }

    public async void CreateFirstProfile()
    {
        _initialBalance = _initialBalance
            .Replace(",", CultureInfo.CurrentCulture.NumberFormat.CurrencyDecimalSeparator);
        
        if (!decimal.TryParse(_initialBalance, out var numValue))
        {
            throw new Exception("Balance must be a number");
        }
        
        var profile = new ProfileModel
        {
            Name = _name,
            InitialBalance = numValue,
            StartDate = DateTime.Now,
            IsCurrent = true
        };

        var domainProfile = _mapper.MapToDomain(profile);
        await _profileService.Create(domainProfile);
    }
}