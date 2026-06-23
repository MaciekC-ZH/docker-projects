# Docker Projects - Learning Journey

Repozytorium zawierające moje projekty i ćwiczenia w ramach nauki konteneryzacji przy użyciu narzędzia **Docker**.

## Projekt 1: Zarządzanie danymi za pomocą Bind Mounts

### Opis projektu
Projekt demonstruje użycie mechanizmu `Bind Mount` w Dockerze do zmapowania lokalnego katalogu roboczego z maszyny hosta bezpośrednio do wnętrza kontenera z serwerem webowym **Nginx**. Pozwala to na edycję kodu źródłowego strony (pliku HTML) na żywo, bez konieczności restartowania lub przebudowywania kontenera.

### Jak uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd moja-strona
