using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Mobile.ViewModels.Transactions;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class FilteredTransactionsPage : ContentPage
{
    public readonly FilteredTransactionsPageViewModel ViewModel;
    
    public FilteredTransactionsPage(FilteredTransactionsPageViewModel viewModel)
    {
        ViewModel = viewModel;
        BindingContext = ViewModel;
        
        InitializeComponent();

        TransactionsCollectionView.ItemsSource = ViewModel.Transactions;
    }

    private async void CloseButton_OnClicked(object? sender, EventArgs e)
    {
        await Navigation.PopModalAsync();
    }
    
    public async void Initialize(Guid profileId, Guid? categoryId, SpendingType? spendingType, DateTime dateFrom, DateTime dateTo)
    {
        await ViewModel.Initialize(profileId, categoryId, spendingType, dateFrom, dateTo);
    }
}