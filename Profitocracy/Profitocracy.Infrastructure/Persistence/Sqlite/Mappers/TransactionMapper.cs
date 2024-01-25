using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Factories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

public class TransactionMapper : IInfrastructureMapper<Transaction, TransactionModel>
{
	public Transaction MapToDomain(TransactionModel model)
	{
		TransactionGeoTag? geoTag = null;
		TransactionCategory? category = null;
		
		if (model.GeoTag is not null)
		{
			geoTag = new TransactionGeoTag
			{
				Latitude = model.GeoTag.Latitude,
				Longitude = model.GeoTag.Longitude
			};
		}

		if (model.Category is not null)
		{
			category = new TransactionCategory(model.Category.CategoryId)
			{
				Name = model.Category.Name
			};
		}

		return TransactionFactory.CreateTransaction(
			model.Id,
			model.Amount,
			model.ProfileId,
			(TransactionType)model.Type,
			(SpendingType)model.SpendingType,
			model.Timestamp,
			model.Description,
			geoTag,
			category);
	}

	public TransactionModel MapToModel(Transaction entity)
	{
		GeoTagModel? geoTag = null;
		TransactionCategoryModel? category = null;
		
		if (entity.GeoTag is not null)
		{
			geoTag = new GeoTagModel
			{
				Latitude = entity.GeoTag.Latitude,
				Longitude = entity.GeoTag.Longitude
			};
		}

		if (entity.Category is not null)
		{
			category = new TransactionCategoryModel
			{
				CategoryId = entity.Category.Id,
				Name = entity.Category.Name
			};
		}
		
		return new TransactionModel
		{
			Id = entity.Id,
			Amount = entity.Amount,
			ProfileId = entity.ProfileId,
			Type = (short)entity.Type,
			SpendingType = (short)entity.SpendingType,
			Timestamp = entity.Timestamp,
			Description = entity.Description,
			GeoTag = geoTag,
			Category = category
		};
	}
}