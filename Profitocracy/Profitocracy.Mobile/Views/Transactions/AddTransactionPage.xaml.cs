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
}