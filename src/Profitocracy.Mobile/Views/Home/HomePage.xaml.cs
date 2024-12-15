using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Mobile.Models.Categories;
using Profitocracy.Mobile.ViewModels.Home;
using Profitocracy.Mobile.Views.Transactions;

namespace Profitocracy.Mobile.Views.Home;

public partial class HomePage : ContentPage
{
	private readonly HomePageViewModel _viewModel;
	
	public HomePage(HomePageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
		InitializeComponent();

		CategoriesExpensesCollectionView.ItemsSource = _viewModel.CategoriesExpenses;
	}

	private void HomePage_OnNavigated(object? sender, EventArgs e)
	{
		_viewModel.Initialize();
	}

	private async void CategoryLayout_OnTapped(object? sender, TappedEventArgs e)
	{
		if ((sender as StackLayout)?.BindingContext is not CategoryExpenseModel category)
		{
			await DisplayAlert(
				"Error",
				"Cannot get category info",
				"OK");
			return;
		}
		
		var filteredPage = Handler?.MauiContext?.Services.GetService<FilteredTransactionsPage>();

		if (filteredPage is null)
		{
			await DisplayAlert(
				"Error",
				"Cannot show filtered transactions",
				"OK");
			return;
		}
		
		filteredPage.Initialize(
			_viewModel.ProfileId,
			category.Id, 
			spendingType: null, 
			dateFrom:DateTime.Parse(_viewModel.DateFrom),
			dateTo: DateTime.Parse(_viewModel.DateTo));
		
		await Navigation.PushModalAsync(filteredPage);
	}
	
	private void MainSpendingTypeLayout_OnTapped(object? sender, TappedEventArgs e)
	{
		SpendingTypeLayout_OnTapped(SpendingType.Main);
	}

	private void SecondarySpendingTypeLayout_OnTapped(object? sender, TappedEventArgs e)
	{
		SpendingTypeLayout_OnTapped(SpendingType.Secondary);
	}

	private void SavedSpendingTypeLayout_OnTapped(object? sender, TappedEventArgs e)
	{
		SpendingTypeLayout_OnTapped(SpendingType.Saved);
	}
	
	private async void SpendingTypeLayout_OnTapped(SpendingType type)
	{
		var filteredPage = Handler?.MauiContext?.Services.GetService<FilteredTransactionsPage>();
		
		if (filteredPage is null)
		{
			await DisplayAlert(
				"Error", 
				"Cannot show filtered transactions", 
				"OK");
			return;
		}
		
		filteredPage.Initialize(
			_viewModel.ProfileId,
			categoryId: null, 
			type,
			dateFrom: DateTime.Parse(_viewModel.DateFrom),
			dateTo: DateTime.Parse(_viewModel.DateTo));

		await Navigation.PushModalAsync(filteredPage);
	}
}