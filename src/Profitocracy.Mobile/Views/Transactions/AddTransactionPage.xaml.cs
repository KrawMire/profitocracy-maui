using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class AddTransactionPage : BaseContentPage
{
	private readonly AddTransactionPageViewModel _viewModel;
	
	public AddTransactionPage(AddTransactionPageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
	
		InitializeComponent();

		CategoryPicker.ItemsSource = _viewModel.AvailableCategories;
	}

	private void CloseButton_OnClicked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await Navigation.PopModalAsync();
		});
	}

	private void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await _viewModel.CreateTransaction();
			await Navigation.PopModalAsync();
		});
	}

	private void AddTransactionPage_OnLoaded(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await _viewModel.Initialize();
		});
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