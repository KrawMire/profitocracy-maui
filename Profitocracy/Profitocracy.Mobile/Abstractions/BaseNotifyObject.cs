using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Profitocracy.Mobile.Abstractions;

public abstract class BaseNotifyObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}