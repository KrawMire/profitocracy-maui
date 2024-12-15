using System.Collections.ObjectModel;
using Profitocracy.Core.Persistence;
using Profitocracy.Core.Specifications;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transactions;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class TransactionsPageViewModel : BaseNotifyObject
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IProfileRepository _profileRepository;
    
    private Guid? _profileId;
    private DateTime _fromDate;
    private DateTime _toDate;
    
    public TransactionsPageViewModel(
        IProfileRepository profileRepository,
        ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
        _profileRepository = profileRepository;
        
        var currentDate = DateTime.Now;
        
        _fromDate = new DateTime(currentDate.Year, currentDate.Month, 1);
        _toDate = new DateTime(
            currentDate.Year,
            currentDate.Month,
            day: DateTime.DaysInMonth(currentDate.Year, currentDate.Month));
    }

    public DateTime FromDate
    {
        get => _fromDate;
        set
        {
            SetProperty(ref _fromDate, value);
            _ = InitializeTransactions();
        }
    }
    
    public DateTime ToDate
    {
        get => _toDate;
        set
        {
            SetProperty(ref _toDate, value);
            _ = InitializeTransactions();
        }
    }
    
    public readonly ObservableCollection<TransactionModel> Transactions = [];

    public async Task Initialize()
    {
        _profileId = await _profileRepository.GetCurrentProfileId();

        if (_profileId is null)
        {
            await Shell.Current.DisplayAlert(
                "Error", 
                "Cannot find current profile", 
                "OK");
            return;
        }
        
        await InitializeTransactions();
    }
    
    public async Task DeleteTransaction(Guid transactionId)
    {
        var deletedId = await _transactionRepository.Delete(transactionId);

        Transactions.Remove(Transactions.Single(t => t.Id == deletedId));
    }

    private async Task InitializeTransactions()
    {
        if (_profileId is null)
        {
            return;
        }

        var specs = new TransactionsSpecification
        {
            ProfileId = _profileId,
            FromDate = _fromDate,
            ToDate = _toDate
        };
        
        var transactions = await _transactionRepository.GetFiltered(specs);
        
        Transactions.Clear();

        foreach (var transaction in transactions)
        {
            Transactions.Add(TransactionModel.FromDomain(transaction));
        }
    }
}