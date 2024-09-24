using System.Collections.ObjectModel;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class TransactionPageViewModel : BaseNotifyObject
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IPresentationMapper<Transaction, TransactionModel> _mapper;
    
    public TransactionPageViewModel(
        IPresentationMapper<Transaction, TransactionModel> mapper,
        IProfileRepository profileRepository,
        ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
        _profileRepository = profileRepository;
        _mapper = mapper;
    }

    public readonly ObservableCollection<TransactionModel> Transactions = [];

    public async Task Initialize()
    {
        var profileId = await _profileRepository.GetCurrentProfileId();

        if (profileId is null)
        {
            await Shell.Current.DisplayAlert("Error", "Cannot find current profile", "OK");
            return;
        }
        
        var transactions = await _transactionRepository.GetAllByProfileId((Guid)profileId);
        
        Transactions.Clear();

        foreach (var transaction in transactions)
        {
            Transactions.Add(_mapper.MapToModel(transaction));
        }
    }

    public async Task DeleteTransaction(Guid transactionId)
    {
        var deletedId = await _transactionRepository.Delete(transactionId);

        Transactions.Remove(Transactions.Single(t => t.Id == deletedId));
    }
}