using System.Globalization;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;
using Profitocracy.Mobile.Utils;
using static System.Decimal;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class AddTransactionPageViewModel : BaseNotifyObject
{
    private readonly IPresentationMapper<Transaction, TransactionModel> _mapper;
    private readonly IProfileService _profileService;
    private readonly ITransactionService _transactionService;

    private TransactionModel _model;
        
        
    public AddTransactionPageViewModel(
        IPresentationMapper<Transaction, TransactionModel> mapper,
        IProfileService profileService,
        ITransactionService transactionService)
    {
        _mapper = mapper;
        _profileService = profileService;
        _transactionService = transactionService;

        _model = new TransactionModel
        {
            Amount = Zero,
            ProfileId = Guid.Empty,
            Type = 0,
            SpendingType = 0,
            Timestamp = DateTime.Now,
            Description = null
        };
    }

    public readonly string[] SpendingTypes =
    [
        "Main",
        "Secondary",
        "Saved"   
    ];

    public readonly string[] TransactionTypes =
    [
        "Expense",
        "Income"
    ];

    public string SpendingType
    {
        get
        {
            if (_model.SpendingType < 0)
            {
                return "Select type";
            }
            
            return SpendingTypes[_model.SpendingType];
        }
        set
        {
            _model.SpendingType = Array.FindIndex(SpendingTypes, type => type == value);
            OnPropertyChanged();
        }
    }

    public string TransactionType
    {
        get
        {
            if (_model.Type < 0)
            {
                return "Select type";
            }
            
            return TransactionTypes[_model.Type];
        }
        set
        {
            _model.Type = Array.FindIndex(TransactionTypes, type => type == value);
            OnPropertyChanged();
        }
    }

    public string Amount
    {
        get => NumberUtils.RoundDecimal(_model.Amount).ToString(CultureInfo.InvariantCulture);
        set
        {
            if (!TryParse(value, out var val))
            {
                Shell.Current.DisplayAlert(
                    "Invalid format", 
                    "Amount must be a number", 
                    "OK");
                OnPropertyChanged();
                return;
            }
            
            _model.Amount = val;
            OnPropertyChanged();
        }
    }

    public string Description
    {
        get => _model.Description ?? "";
        set
        {
            _model.Description = string.IsNullOrWhiteSpace(value) ? null : value;
            OnPropertyChanged();
        }
    }
    
    public async Task CreateTransaction()
    {
        var currentProfile = await _profileService.GetCurrentProfile();

        if (currentProfile is null)
        {
            Shell.Current?.DisplayAlert(
                "Error", 
                "Current profile was not found", 
                "OK");
            return;
        }

        var profileId = currentProfile.Id;
        _model.ProfileId = profileId;

        try
        {
            var transaction = _mapper.MapToDomain(_model);
            await _transactionService.Create(transaction);
        }
        catch (Exception ex)
        {
            Shell.Current?.DisplayAlert(
                "Error", 
                ex.Message, 
                "OK");
        }
    }
}