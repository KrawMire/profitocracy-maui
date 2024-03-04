using Profitocracy.Mobile.Models.Transaction;
using Profitocracy.Mobile.ViewModels.Transactions;
using Profitocracy.Mobile.Views.Transactions;

namespace Profitocracy.Mobile.Views.Pages.Transactions;

public partial class TransactionsPage : ContentPage
{
	public readonly TransactionPageViewModel ViewModel;
	
	public TransactionsPage(TransactionPageViewModel viewModel)
	{
		ViewModel = viewModel;
		BindingContext = ViewModel;
		
		InitializeComponent();

		TransactionsCollectionView.ItemsSource = ViewModel.Transactions;
	}

	private void TransactionsPage_OnNavigatedTo(object? sender, NavigatedToEventArgs e)
	{
		ViewModel.Initialize();
	}

	private void TransactionsPage_OnLoaded(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
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
		var swipeItem = sender as SwipeItem;

		if (swipeItem is null)
		{
			await DisplayAlert("Error", "Internal error. Try again", "OK");
			return;
		}

		var transaction = swipeItem.BindingContext as TransactionModel;

		if (transaction?.Id is null)
		{
			await DisplayAlert("Error", "Cannot find transaction to delete", "OK");
			return;
		}
		
		ViewModel.DeleteTransaction((Guid)transaction.Id);
	}
}