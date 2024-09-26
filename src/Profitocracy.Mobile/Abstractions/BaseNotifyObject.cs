using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Profitocracy.Mobile.Abstractions;

public abstract class BaseNotifyObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    protected void SetProperty<T>(ref T property, T value, [CallerMemberName] string? propertyName = null)
    {
        if (Equals(property, value))
        {
            return;
        }
        
        property = value;
        OnPropertyChanged(propertyName);
    }

    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}