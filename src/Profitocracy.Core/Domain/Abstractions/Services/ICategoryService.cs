namespace Profitocracy.Core.Domain.Abstractions.Services;

/// <summary>
/// Core business logic related
/// to complex categories management
/// </summary>
public interface ICategoryService
{
    /// <summary>
    /// Deletes the category with the specified ID.
    /// </summary>
    /// <param name="id">The unique identifier of the category to be deleted.</param>
    /// <returns>Returns the unique identifier of the deleted category.</returns>
    Task<Guid> DeleteCategory(Guid id);
}