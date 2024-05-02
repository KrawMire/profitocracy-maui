using System.Collections.ObjectModel;
using System.Globalization;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.ViewModels.Transactions;

public class AddTransactionPageViewModel : BaseNotifyObject
{
    private readonly IPresentationMapper<Category, CategoryModel> _categoryMapper;
    private readonly IPresentationMapper<Transaction, TransactionModel> _mapper;
    private readonly IProfileService _profileService;
    private readonly ITransactionService _transactionService;
    private readonly ICategoryService _categoryService;

    private TransactionModel _model;
    private bool _isSpendingTypeVisible;
    private string _transactionType;
    private string _spendingType;
    private string _amount = string.Empty;
        
        
    public AddTransactionPageViewModel(
        IPresentationMapper<Transaction, TransactionModel> mapper,
        IPresentationMapper<Category, CategoryModel> categoryMapper,
        IProfileService profileService,
        ITransactionService transactionService,
        ICategoryService categoryService)
    {
        _mapper = mapper;
        _categoryMapper = categoryMapper;
        _profileService = profileService;
        _transactionService = transactionService;
        _categoryService = categoryService;

        _model = new TransactionModel
        {
            Amount = decimal.Zero,
            ProfileId = Guid.Empty,
            Type = 0,
            SpendingType = -1,
            Timestamp = DateTime.Now,
            Description = null
        };
    }

    public readonly string[] SpendingTypes =
    [
        "Main",
        "Secondary",
        "Saved"
    ];

    public readonly string[] TransactionTypes =
    [
        "Income",
        "Expense"
    ];

    public readonly ObservableCollection<CategoryModel> AvailableCategories = [];

    public int TransactionTypeIndex
    {
        get => _model.Type;
        set
        {
            _model.Type = value;
            TransactionType = TransactionTypes[_model.Type];
            IsSpendingTypeVisible = _model.Type != 0;
            OnPropertyChanged();
        }
    }
    
    public string TransactionType
    {
        get => _transactionType;
        private set
        {
            _transactionType = value;
            OnPropertyChanged();
        }
    }

    public bool IsSpendingTypeVisible
    {
        get => _isSpendingTypeVisible;
        private set
        {
            _isSpendingTypeVisible = value;
            OnPropertyChanged();
        }
    }
    
    public int SpendingTypeIndex
    {
        get => _model.SpendingType ?? -1;
        set
        {
            if (value == -1)
            {
                _model.SpendingType = null;
            }

            _model.SpendingType = value;
            SpendingType = SpendingTypes[(int)_model.SpendingType];
            
            OnPropertyChanged();
        }
    }
    
    public string SpendingType
    {
        get => _spendingType;
        private set
        {
            _spendingType = value;
            OnPropertyChanged();
        }
    }
    
    public CategoryModel? Category { get; set; }

    public string Amount
    {
        get => _amount;
        set
        {
            _amount = value;
            OnPropertyChanged();
        }
    }

    public string Description
    {
        get => _model.Description ?? "";
        set
        {
            _model.Description = string.IsNullOrWhiteSpace(value) ? null : value;
            OnPropertyChanged();
        }
    }

    public DateTime Timestamp
    {
        get => _model.Timestamp;
        set
        {
            _model.Timestamp = value;
            OnPropertyChanged();
        }
    }

    public async Task Initialize()
    {
        var profileId = await _profileService.GetCurrentProfileId();
        
        if (profileId is null)
        {
            throw new Exception("Current profile was not found");
        }
        
        var categories = await _categoryService.GetAllByProfileId((Guid)profileId);

        foreach (var category in categories)
        {
            AvailableCategories.Add(_categoryMapper.MapToModel(category));
        }
    }

    public async Task CreateTransaction()
    {
        _amount = _amount
            .Replace(",", CultureInfo.CurrentCulture.NumberFormat.CurrencyDecimalSeparator);
        
        if (!decimal.TryParse(_amount, out var val))
        {
            throw new Exception("Amount must be a number");
        }

        _model.Amount = val;
        
        if (_model.Type < 0)
        {
            throw new Exception("Invalid transaction type");
        }
        
        var currentProfileId = await _profileService.GetCurrentProfileId();

        if (currentProfileId is null)
        {
            throw new Exception("Current profile was not found");
        }

        _model.ProfileId = (Guid)currentProfileId;

        if (Category?.Id is not null)
        {
            _model.Category = new TransactionCategoryModel
            {
                Name = Category.Name,
                CategoryId = (Guid)Category.Id
            };
        }

        var transaction = _mapper.MapToDomain(_model);
        await _transactionService.Create(transaction);
    }
}