using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profitocracy.Mobile.Views.Transactions;

public partial class AddTransactionPage : ContentPage
{
	public AddTransactionPage()
	{
		InitializeComponent();
	}

	private async void CloseButton_OnClicked(object? sender, EventArgs e)
	{
		await Navigation.PopModalAsync();
	}
}