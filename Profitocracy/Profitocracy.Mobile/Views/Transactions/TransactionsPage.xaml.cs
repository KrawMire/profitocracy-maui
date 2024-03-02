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
}