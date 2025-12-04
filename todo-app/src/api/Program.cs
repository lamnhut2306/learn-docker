using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("TodoDb")));

builder.Services.AddCors();

var app = builder.Build();

// Enable CORS without restrictions
app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    await db.Database.MigrateAsync();
}

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

var todoGroups = app.MapGroup("api/todos");

todoGroups.MapGet("", (TodoDbContext todoDbContext) =>
{
    return todoDbContext.TodoItems.ToList();
});

todoGroups.MapGet("/{id}", (TodoDbContext todoDbContext, [FromRoute] Guid id) =>
{
    return todoDbContext.TodoItems.FirstOrDefaultAsync(item => item.Id == id);
});

todoGroups.MapPost("", async (TodoDbContext todoDbContext, [FromBody] TodoItemDto todoItem) =>
{
    var todoItemId = todoItem.Id is not null && Guid.TryParse(todoItem.Id, out var parsedId)
        ? parsedId
        : Guid.NewGuid();

    var todoEntity = new TodoItem(
        todoItemId,
        todoItem.Title ?? string.Empty,
        todoItem.Description ?? string.Empty,
        todoItem.IsCompleted ?? false
    );

    await todoDbContext.TodoItems.AddAsync(todoEntity);
    await todoDbContext.SaveChangesAsync();
    return Results.Created($"api/todos/{todoEntity.Id}", todoEntity);
});

todoGroups.MapPut("/{id}", async (TodoDbContext todoDbContext,
    [FromRoute] Guid id,
    [FromBody] TodoItemDto updatedTodoItemDto) =>
{
    var existingTodoItem = await todoDbContext.TodoItems.FirstOrDefaultAsync(item => item.Id == id);
    if (existingTodoItem is null)
    {
        return Results.NotFound();
    }

    var updatedTodoItem = new TodoItem(
        existingTodoItem.Id,
        updatedTodoItemDto.Title ?? string.Empty,
        updatedTodoItemDto.Description ?? string.Empty,
        updatedTodoItemDto.IsCompleted ?? false
    );

    todoDbContext.TodoItems.Entry(existingTodoItem).CurrentValues.SetValues(updatedTodoItem);
    await todoDbContext.SaveChangesAsync();
    return Results.NoContent();
});

todoGroups.MapDelete("/{id}", async (TodoDbContext todoDbContext, [FromRoute] Guid id) =>
{
    var existingTodoItem = await todoDbContext.TodoItems.FirstOrDefaultAsync(item => item.Id == id);
    if (existingTodoItem is null)
    {
        return Results.NotFound();
    }

    todoDbContext.TodoItems.Remove(existingTodoItem);
    await todoDbContext.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

