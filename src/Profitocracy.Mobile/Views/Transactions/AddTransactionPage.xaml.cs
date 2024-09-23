using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class AddTransactionPage : ContentPage
{
	public readonly AddTransactionPageViewModel ViewModel;
	
	public AddTransactionPage(AddTransactionPageViewModel viewModel)
	{
		ViewModel = viewModel;
		BindingContext = ViewModel;
	
		InitializeComponent();
		
		CategoryPicker.ItemsSource = ViewModel.AvailableCategories;
	}

	private async void CloseButton_OnClicked(object? sender, EventArgs e)
	{
		await Navigation.PopModalAsync();
	}

	private async void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		try
		{
			await ViewModel.CreateTransaction();
			await Navigation.PopModalAsync();
		}
		catch (Exception ex)
		{
			await DisplayAlert("Error", ex.Message, "OK");
		}
	}

	private async void AddTransactionPage_OnLoaded(object? sender, EventArgs e)
	{
		try
		{
			await ViewModel.Initialize();
		}
		catch (Exception ex)
		{
			await DisplayAlert("Error", ex.Message, "OK");
		}
	}

	private void IncomeButton_OnClicked(object? sender, EventArgs e)
	{
		ViewModel.TransactionType = 0;
	}

	private void ExpenseButton_OnClicked(object? sender, EventArgs e)
	{
		ViewModel.TransactionType = 1;
	}

	private void MainTypeButton_OnClicked(object? sender, EventArgs e)
	{
		ViewModel.SpendingType = 0;
	}

	private void SecondaryTypeButton_OnClicked(object? sender, EventArgs e)
	{
		ViewModel.SpendingType = 1;
	}

	private void SavedTypeButton_OnClicked(object? sender, EventArgs e)
	{
		ViewModel.SpendingType = 2;
	}
}