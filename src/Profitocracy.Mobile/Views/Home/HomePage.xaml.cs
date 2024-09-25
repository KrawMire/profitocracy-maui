using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Mobile.Models.DisplayModels;
using Profitocracy.Mobile.ViewModels.Home;
using Profitocracy.Mobile.Views.Transactions;

namespace Profitocracy.Mobile.Views.Home;

public partial class HomePage : ContentPage
{
	public readonly HomePageViewModel ViewModel;
	
	public HomePage(HomePageViewModel viewModel)
	{
		ViewModel = viewModel;
		BindingContext = ViewModel;
		InitializeComponent();

		CategoriesExpensesCollectionView.ItemsSource = ViewModel.CategoriesExpenses;
	}

	private void HomePage_OnNavigated(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
	}

	private async void CategoryLayout_OnTapped(object? sender, TappedEventArgs e)
	{
		if ((sender as StackLayout)?.BindingContext is not DisplayCategoryExpense category)
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
			category.Id, 
			spendingType: null, 
			dateFrom:DateTime.Parse(ViewModel.DateFrom),
			dateTo: DateTime.Parse(ViewModel.DateTo));
		
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
			categoryId: null, 
			type,
			dateFrom: DateTime.Parse(ViewModel.DateFrom),
			dateTo: DateTime.Parse(ViewModel.DateTo));

		await Navigation.PushModalAsync(filteredPage);
	}
}