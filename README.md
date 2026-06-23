# Docker Projects - Learning Journey

Repozytorium zawierające moje projekty i ćwiczenia w ramach nauki konteneryzacji przy użyciu narzędzia **Docker**.

## Projekt 1: Zarządzanie danymi za pomocą Bind Mounts

### Opis projektu
Projekt demonstruje użycie mechanizmu `Bind Mount` w Dockerze do zmapowania lokalnego katalogu roboczego z maszyny hosta bezpośrednio do wnętrza kontenera z serwerem webowym **Nginx**. Pozwala to na edycję kodu źródłowego strony (pliku HTML) na żywo, bez konieczności restartowania lub przebudowywania kontenera.

### Jak uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd moja-strona
   docker run -d -p 8282:80 --name serwer_developer -v "$(pwd)":/usr/share/nginx/html nginx
## Projekt 2: Zarządzanie danymi za pomocą Docker Volumes (PostgreSQL 18+)

### Opis projektu
Projekt demonstruje użycie niezależnych wolumenów zarządzanych przez Dockera (`Docker Volumes`) w celu zapewnienia trwałości danych dla bazy danych **PostgreSQL**. W ramach ćwiczenia zasymulowano awarię i całkowite usunięcie kontenera bazy danych, udowadniając, że dane przechowywane w wolumenie bezstratnie przetrwały proces niszczenia i odtwarzania infrastruktury.

### Jak uruchomić?
1. Stwórz dedykowany wolumen:
   ```bash
   docker volume create bank_db_data
   docker run -d --name baza_sklepu -e POSTGRES_PASSWORD=tajne_haslo -v bank_db_data:/var/lib/postgresql postgres
