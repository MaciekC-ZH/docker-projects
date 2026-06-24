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

## Projekt 3: Izolacja i komunikacja za pomocą Docker Networks

### Opis projektu
Projekt demonstruje tworzenie dedykowanej sieci wirtualnej (`User-Defined Bridge Network`) w celu odizolowania kontenerów oraz uruchomienia wewnętrznego mechanizmu DNS Dockera. W ramach ćwiczenia baza danych PostgreSQL została uruchomiona bez mapowania portów na hosta (pełna izolacja od sieci zewnętrznej), a komunikacja między kontenerami została zrealizowana przy użyciu nazw kontenerów (`service discovery`), eliminując potrzebę hardkodowania adresów IP.

### Jak uruchomić?
1. Stwórz dedykowaną sieć wirtualną:
   ```bash
   docker network create bezpieczna_siec
2. Uruchom kontener bazy danych wewnątrz sieci:
   ```Bash
   docker run -d --name kontener_bazy --network bezpieczna_siec -e POSTGRES_PASSWORD=super_tajne_haslo postgres
3. Przetestuj łączność z innego kontenera w tej samej sieci za pomocą nazwy DNS:
   ```Bash
   docker run -it --rm --network bezpieczna_siec alpine ping -c 4 kontener_bazy

## Projekt 4: Dwuwarstwowa architektura produkcyjna (PostgreSQL + pgAdmin)

### Opis projektu
Zaawansowany projekt łączący wiedzę z zakresu wolumenów (`Docker Volumes`) oraz sieci (`Docker Networks`). Zbudowano dwuwarstwową architekturę składającą się z bazy danych PostgreSQL oraz webowego narzędzia administracyjnego pgAdmin. Baza danych została w pełni odizolowana w sieci wewnętrznej, a jej stan jest utrwalany w niezależnym wolumenie. Dostęp do zarządzania strukturą danych odbywa się bezpiecznie przez kontener proxy (pgAdmin) wystawiony na porcie `5050`.

### Jak uruchomić?
1. Przygotuj sieć i wolumen:
   ```bash
   docker network create siec_produkcyjna
   docker volume create dane_postgres_prod
2. Uruchom odizolowaną bazę danych:
   ```Bash
   docker run -d --name db_prod --network siec_produkcyjna -v dane_postgres_prod:/var/lib/postgresql -e POSTGRES_PASSWORD=haslo_prod postgres

3. Uruchom panel administracyjny na porcie 5050:
   ```Bash
   docker run -d --name panel_admina --network siec_produkcyjna -p 5050:80 -e PGADMIN_
