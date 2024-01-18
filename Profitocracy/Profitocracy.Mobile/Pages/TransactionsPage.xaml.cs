namespace Profitocracy.Mobile.Pages;

public partial class TransactionsPage : ContentPage
{
	private readonly List<string> _transactions = ["", "", "", ""];
	
	public TransactionsPage()
	{
		InitializeComponent();
		TransactionsListView.ItemsSource = _transactions;
	}
}