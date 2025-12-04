# run sql server container
podman pull mcr.microsoft.com/mssql/server:2025-latest
podman run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Your_password123' -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2025-latest

# run web api without container
dotnet publish -c Release -o ./src/api/out ./src/api/Todo.API.csproj
dotnet ./src/api/out/Todo.API.dll