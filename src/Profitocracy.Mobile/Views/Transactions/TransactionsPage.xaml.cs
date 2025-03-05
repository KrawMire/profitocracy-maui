using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transactions;
using Profitocracy.Mobile.Resources.Strings;
using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class TransactionsPage : BaseContentPage
{
	private readonly TransactionsPageViewModel _viewModel;
	
	public TransactionsPage(TransactionsPageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
		
		InitializeComponent();

		TransactionsCollectionView.ItemsSource = _viewModel.Transactions;
	}

	private void TransactionsPage_NavigatedTo(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await _viewModel.Initialize();
		});
	}

	private void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			var addPage = Handler?.MauiContext?.Services.GetService<AddTransactionPage>();

			if (addPage is null)
			{
				throw new Exception(AppResources.CommonError_OpenAddTransactionPage);
			}
		
			await Navigation.PushModalAsync(addPage);
		});
	}

	private void SwipeItem_OnInvoked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			if (sender is not SwipeItemView swipeItem)
			{
				throw new Exception(AppResources.CommonError_InternalErrorTryAgain);
			}

			var transaction = swipeItem.BindingContext as TransactionModel;

			if (transaction?.Id is null)
			{
				throw new Exception(AppResources.CommonError_FindTransactionToDelete);
			}
		
			await _viewModel.DeleteTransaction((Guid)transaction.Id);
		});
	}
}