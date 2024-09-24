using System.Collections.ObjectModel;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Core.Persistence;
using Profitocracy.Core.Specifications;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class FilteredTransactionsPageViewModel : BaseNotifyObject
{
    private readonly IPresentationMapper<Transaction, TransactionModel> _transactionMapper;
    private readonly ITransactionRepository _transactionRepository;

    public FilteredTransactionsPageViewModel(
        ITransactionRepository transactionRepository, 
        IPresentationMapper<Transaction, TransactionModel> transactionMapper)
    {
        _transactionRepository = transactionRepository;
        _transactionMapper = transactionMapper;
    }

    public readonly ObservableCollection<TransactionModel> Transactions = [];

    public async Task Initialize(Guid? categoryId, SpendingType? spendingType, DateTime dateFrom, DateTime dateTo)
    {
        Transactions.Clear();
        
        var specs = new TransactionsSpecification
        {
            CategoryId = categoryId,
            SpendingType = spendingType,
            FromDate = dateFrom,
            ToDate = dateTo
        };

        var transactions = await _transactionRepository.GetFiltered(specs);

        foreach (var transaction in transactions)
        {
            Transactions.Add(_transactionMapper.MapToModel(transaction));
        }
    }
}