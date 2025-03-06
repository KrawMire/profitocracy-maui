using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Categories;
using Profitocracy.Mobile.Resources.Strings;
using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class ExpenseCategoriesSettingsPage : BaseContentPage
{
	private readonly ExpenseCategoriesSettingsPageViewModel _viewModel;
	
	public ExpenseCategoriesSettingsPage(ExpenseCategoriesSettingsPageViewModel viewModel)
	{
		InitializeComponent();

		BindingContext = _viewModel = viewModel;
		CategoriesCollectionView.ItemsSource = _viewModel.Categories;
	}

	private void UpdateCategoriesList(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await _viewModel.Initialize();
		});
	}

	private void AddCategoryButton_OnClicked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			await OpenAddCategoryPage();
		});
	}

	private void EditCategory_OnInvoked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			throw new NotImplementedException();
		});
	}

	private void DeleteCategory_OnInvoked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			if (sender is not SwipeItemView swipeItem)
			{
				throw new InvalidCastException(AppResources.CommonError_InternalErrorTryAgain);
			}
			
			var category = swipeItem.BindingContext as CategoryModel;

			if (category?.Id is null)
			{
				throw new ArgumentNullException(AppResources.CommonError_FindCategoryToDelete);
			}
			
			await _viewModel.DeleteCategory((Guid)category.Id);
		});
	}
	
	private async Task OpenAddCategoryPage()
	{
		var addPage = Handler?.MauiContext?.Services.GetService<AddExpenseCategoryPage>();

		if (addPage is null)
		{
			throw new ArgumentNullException(AppResources.CommonError_OpenAddCategoryPage);
		}

		await Navigation.PushModalAsync(addPage);
	}
}