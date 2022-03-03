namespace Mastery.Services.Interfaces
{
    public interface IService<T>
    {
        Task AddAsync(T item);
        Task RemoveAsync(int id);
        Task UpdateAsync(int id, T item);
        Task<T> GetAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
    }
}
