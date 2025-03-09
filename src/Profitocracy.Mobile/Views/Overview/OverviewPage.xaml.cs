using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.ViewModels.Overview;

namespace Profitocracy.Mobile.Views.Overview;

public partial class OverviewPage : BaseContentPage
{
    private readonly OverviewPageViewModel _viewModel;
    
    public OverviewPage(OverviewPageViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = _viewModel = viewModel;
    }

    private void OverviewPage_OnNavigatedTo(object? sender, NavigatedToEventArgs e)
    {
        ProcessAction(async () =>
        {
            await _viewModel.Initialize();
        });
    }
}