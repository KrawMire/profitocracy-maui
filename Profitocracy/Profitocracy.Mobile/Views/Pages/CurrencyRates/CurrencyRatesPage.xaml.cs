namespace Profitocracy.Mobile.Views.Pages.CurrencyRates;

public partial class CurrencyRatesPage : ContentPage
{
	private readonly List<string> _testList = ["", ""];
	
	public CurrencyRatesPage()
	{
		InitializeComponent();
		CurrenciesListView.ItemsSource = _testList;
	}
}