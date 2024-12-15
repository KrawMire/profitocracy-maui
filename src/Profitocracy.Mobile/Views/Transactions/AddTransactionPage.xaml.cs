using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class AddTransactionPage : ContentPage
{
	private readonly AddTransactionPageViewModel _viewModel;
	
	public AddTransactionPage(AddTransactionPageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
	
		InitializeComponent();

		CategoryPicker.ItemsSource = _viewModel.AvailableCategories;
	}

	private async void CloseButton_OnClicked(object? sender, EventArgs e)
	{
		await Navigation.PopModalAsync();
	}

	private async void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		try
		{
			await _viewModel.CreateTransaction();
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
			await _viewModel.Initialize();
		}
		catch (Exception ex)
		{
			await DisplayAlert("Error", ex.Message, "OK");
		}
	}

	private void IncomeButton_OnClicked(object? sender, EventArgs e)
	{
		_viewModel.TransactionType = 0;
	}

	private void ExpenseButton_OnClicked(object? sender, EventArgs e)
	{
		_viewModel.TransactionType = 1;
	}

	private void MainTypeButton_OnClicked(object? sender, EventArgs e)
	{
		_viewModel.SpendingType = 0;
	}

	private void SecondaryTypeButton_OnClicked(object? sender, EventArgs e)
	{
		_viewModel.SpendingType = 1;
	}

	private void SavedTypeButton_OnClicked(object? sender, EventArgs e)
	{
		_viewModel.SpendingType = 2;
	}
}