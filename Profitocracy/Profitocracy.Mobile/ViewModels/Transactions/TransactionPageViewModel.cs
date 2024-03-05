using System.Collections.ObjectModel;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class TransactionPageViewModel : BaseNotifyObject
{
    private readonly ITransactionService _transactionService;
    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Transaction, TransactionModel> _mapper;
    
    public TransactionPageViewModel(
        IPresentationMapper<Transaction, TransactionModel> mapper,
        IProfileService profileService,
        ITransactionService transactionService)
    {
        _transactionService = transactionService;
        _profileService = profileService;
        _mapper = mapper;
    }

    public readonly ObservableCollection<TransactionModel> Transactions = [];

    public async void Initialize()
    {
        var profileId = await _profileService.GetCurrentProfileId();

        if (profileId is null)
        {
            await Shell.Current.DisplayAlert("Error", "Cannot find current profile", "OK");
            return;
        }
        
        var transactions = await _transactionService.GetAllByProfileId((Guid)profileId);
        
        Transactions.Clear();

        foreach (var transaction in transactions)
        {
            Transactions.Add(_mapper.MapToModel(transaction));
        }
    }

    public async void DeleteTransaction(Guid transactionId)
    {
        var deletedId = await _transactionService.Delete(transactionId);

        Transactions.Remove(Transactions.Single(t => t.Id == deletedId));
    }
}