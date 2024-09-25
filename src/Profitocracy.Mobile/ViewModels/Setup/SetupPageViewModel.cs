using System.Globalization;
using Profitocracy.Core.Domain.Model.Profiles;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;

namespace Profitocracy.Mobile.ViewModels.Setup;

public class SetupPageViewModel : BaseNotifyObject
{
    private string _name = "";
    private string _initialBalance = "0";

    private readonly IProfileRepository _profileRepository;
    private readonly IPresentationMapper<Profile, ProfileModel> _mapper;
    
    public SetupPageViewModel(IProfileRepository profileRepository, IPresentationMapper<Profile, ProfileModel> mapper)
    {
        _profileRepository = profileRepository;
        _mapper = mapper;
    }

    public string Name
    {
        get => _name;
        set => SetProperty(ref _name, value);
    }

    public string InitialBalance
    {
        get => _initialBalance;
        set => SetProperty(ref _initialBalance, value);
    }

    public async void CreateFirstProfile()
    {
        _initialBalance = _initialBalance.Replace(
            ",", 
            CultureInfo.CurrentCulture.NumberFormat.CurrencyDecimalSeparator);
        
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
        await _profileRepository.Create(domainProfile);
    }
}