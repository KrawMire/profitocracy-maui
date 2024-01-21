using System.Collections.ObjectModel;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

namespace Profitocracy.Mobile.Views.Pages.Transactions;

public partial class TransactionsPage : ContentPage
{
	private readonly ITransactionService _transactionService;
	private readonly ObservableCollection<Transaction> _transactions = [];
	
	public TransactionsPage(ITransactionService transactionService)
	{
		InitializeComponent();
		
		_transactionService = transactionService ?? throw new ArgumentNullException(nameof(transactionService));
		TransactionsListView.ItemsSource = _transactions;
	}

	private async void TransactionsPage_OnLoaded(object? sender, EventArgs e)
	{
		var transactions = await _transactionService.GetAll();
		
		MainThread.BeginInvokeOnMainThread(() =>
		{
			_transactions.Clear();
			
			foreach (var t in transactions)
			{
				_transactions.Add(t);
			}	
		});
	}

	private async void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		var transaction = new Transaction
		{
			Id = Guid.NewGuid(),
			Amount = 100
		};

		_ = await _transactionService.Create(transaction);
		var transactions = await _transactionService.GetAll();
		
		MainThread.BeginInvokeOnMainThread(() =>
		{
			_transactions.Clear();
			foreach (var t in transactions)
			{
				_transactions.Add(t);
			}
		});
	}
}