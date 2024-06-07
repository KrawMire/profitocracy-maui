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
    
    private static readonly CategoryModel NoneCategory = new()
    {
        Id = Guid.NewGuid(),
        ProfileId = default,
        Name = "None"
    };
    
    private TransactionModel _model;
    private string _amount = string.Empty;

    private bool _isIncome;
    private bool _isExpense;
    private bool _isMain;
    private bool _isSecondary;
    private bool _isSaved;
        
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
            Type = 1,
            SpendingType = 0,
            Timestamp = DateTime.Now,
            Description = null
        };

        _isExpense = true;
        _isIncome = false;

        _isMain = true;
        _isSecondary = false;
        _isSaved = false;
    }
    
    public readonly ObservableCollection<CategoryModel> AvailableCategories = [];
    
    public CategoryModel? Category { get; set; }

    public bool IsIncome
    {
        get => _isIncome;
        set
        {
            _isIncome = value;
            OnPropertyChanged();
        }
    }

    public bool IsExpense
    {
        get => _isExpense;
        set
        {
            _isExpense = value;
            OnPropertyChanged();
        }
    }
    
    public bool IsMain
    {
        get => _isMain;
        set
        {
            _isMain = value;
            OnPropertyChanged();
        }
    }
    
    public bool IsSecondary
    {
        get => _isSecondary;
        set
        {
            _isSecondary = value;
            OnPropertyChanged();
        }
    }
    
    public bool IsSaved
    {
        get => _isSaved;
        set
        {
            _isSaved = value;
            OnPropertyChanged();
        }
    }
    
    public int TransactionType
    {
        get => _model.Type;
        set
        {
            if (value != _model.Type)
            {
                _model.Type = value;

                if (value == 0)
                {
                    IsIncome = true;
                    IsExpense = false;
                    SpendingType = null;
                }

                if (value == 1)
                {
                    IsIncome = false;
                    IsExpense = true;
                    SpendingType = 0;
                }
                
                OnPropertyChanged();
            }
        }
    }
    
    public int? SpendingType
    {
        get => _model.SpendingType;
        set
        {
            if (value != _model.SpendingType)
            {
                _model.SpendingType = value;

                switch (value)
                {
                    case 0:
                        IsMain = true;
                        IsSecondary = false;
                        IsSaved = false;
                        break;
                    case 1:
                        IsMain = false;
                        IsSecondary = true;
                        IsSaved = false;
                        break;
                    case 2:
                        IsMain = false;
                        IsSecondary = false;
                        IsSaved = true;
                        break;
                    default:
                        IsMain = true;
                        IsSecondary = false;
                        IsSaved = false;
                        break;
                }
                
                OnPropertyChanged();
            }
        }
    }
    
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

        AvailableCategories.Add(NoneCategory);
        
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
            if (Category.Id.Equals(NoneCategory.Id))
            {
                _model.Category = null;
            }
            else
            {
                _model.Category = new TransactionCategoryModel
                {
                    Name = Category.Name,
                    CategoryId = (Guid)Category.Id
                };   
            }
        }

        var transaction = _mapper.MapToDomain(_model);
        await _transactionService.Create(transaction);
    }
}