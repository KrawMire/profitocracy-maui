using Profitocracy.Mobile.Models.Transactions;
using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class TransactionsPage : ContentPage
{
	private readonly TransactionsPageViewModel _viewModel;
	
	public TransactionsPage(TransactionsPageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
		
		InitializeComponent();

		TransactionsCollectionView.ItemsSource = _viewModel.Transactions;
	}

	private async void TransactionsPage_NavigatedTo(object? sender, EventArgs e)
	{
		await _viewModel.Initialize();
	}

	private async void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		var addPage = Handler?.MauiContext?.Services.GetService<AddTransactionPage>();

		if (addPage is null)
		{
			await DisplayAlert(
				"Error", 
				"Cannot open transaction adding page", 
				"OK");
			return;
		}
		
		await Navigation.PushModalAsync(addPage);
	}

	private async void SwipeItem_OnInvoked(object? sender, EventArgs e)
	{
		if (sender is not SwipeItemView swipeItem)
		{
			await DisplayAlert(
				"Error", 
				"Internal error. Try again", 
				"OK");
			return;
		}

		var transaction = swipeItem.BindingContext as TransactionModel;

		if (transaction?.Id is null)
		{
			await DisplayAlert(
				"Error", 
				"Cannot find transaction to delete", 
				"OK");
			return;
		}
		
		await _viewModel.DeleteTransaction((Guid)transaction.Id);
	}
}