using Profitocracy.Mobile.Models.Transaction;
using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

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

	private async void UpdateTransactionsList(object? sender, EventArgs e)
	{
		await ViewModel.Initialize();
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
		
		await ViewModel.DeleteTransaction((Guid)transaction.Id);
	}
}