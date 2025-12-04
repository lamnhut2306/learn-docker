public record TodoItem(Guid Id, string Title, string Description, bool IsCompleted);

public class TodoItemDto
{
    public string? Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool? IsCompleted { get; set; }
}