using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class AddTransactionPage : ContentPage
{
	public readonly AddTransactionPageViewModel ViewModel;
	
	public AddTransactionPage(AddTransactionPageViewModel viewModel)
	{
		ViewModel = viewModel ?? throw new ArgumentNullException(nameof(viewModel));
		BindingContext = ViewModel;
	
		InitializeComponent();
		
		TransactionTypePicker.ItemsSource = ViewModel.TransactionTypes.ToList();
		SpendingTypePicker.ItemsSource = ViewModel.SpendingTypes.ToList();
	}

	private async void CloseButton_OnClicked(object? sender, EventArgs e)
	{
		await Navigation.PopModalAsync();
	}

	private async void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		await ViewModel.CreateTransaction();
		await Navigation.PopModalAsync();
	}

	private string ViewModelToString()
	{
		return @$"
		{ViewModel.TransactionType}
		{ViewModel.SpendingType}
		{ViewModel.Amount}
		{ViewModel.Description}
		";
	}
}