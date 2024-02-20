using Profitocracy.Mobile.Views.Transactions;

namespace Profitocracy.Mobile.Views.Pages.Transactions;

public partial class TransactionsPage : ContentPage
{
	public TransactionsPage()
	{
		InitializeComponent();
	}

	private void TransactionsPage_OnLoaded(object? sender, EventArgs e)
	{
		
	}

	private void AddTransactionButton_OnClicked(object? sender, EventArgs e)
	{
		Navigation.PushModalAsync(new AddTransactionPage());
	}
}