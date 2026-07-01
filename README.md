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
   docker run -d --name panel_admina --network siec_produkcyjna -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=admin@cyberbank.pl -e PGADMIN_DEFAULT_PASSWORD=admin_haslo dpage/pgadmin4

## Zadanie 5: Utrwalanie wiedzy.
   Na podstawie wiedzy z poprzednich ćwieczeń, wykonałem zadanie wygenerowane przez Gemini. Nic nowszego niż to co było dotychczas.

## Projekt 5: Budowanie autorskich obrazów za pomocą Dockerfile

### Opis projektu
Projekt demonstruje proces tworzenia własnego, niezależnego obrazu kontenera przy użyciu pliku konfiguracyjnego `Dockerfile`. Jako bazy użyto ultralekkiego obrazu `nginx:alpine`, do którego wstrzyknięto statyczny plik HTML na etapie budowania struktury warstwowej (`build time`). Projekt udowadnia, że aplikacja wraz ze wszystkimi zasobami może zostać w pełni skonteneryzowana i uruchomiona na dowolnym środowisku bez konieczności montowania zewnętrznych wolumenów deweloperskich.

### Jak zbudować i uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd projekt-dockerfile
2. Zbuduj autorski obraz (pamiętaj o kropce na końcu):

   ```Bash
   docker build -t moj-pierwszy-obraz:v1 .
   
3. Uruchom kontener na podstawie nowo powstałego obrazu:
   ```Bash
   docker run -d --name moja_autorska_strona -p 8080:80 moj-pierwszy-obraz:v1

## Projekt 6: Customizacja systemowa za pomocą instrukcji RUN i CMD

### Opis projektu
Projekt demonstruje tworzenie obrazu Dockera opartego na oficjalnej dystrybucji `ubuntu:latest`. W procesie budowania warstwowego wykorzystano instrukcję `RUN` do aktualizacji systemowego menedżera pakietów `apt` oraz instalacji narzędzi sieciowych (`curl`, `ping`). Instrukcja `CMD` została skonfigurowana w formacie *Exec Form*, programując kontener do automatycznego odpytania zewnętrznego API o publiczny adres IP hosta bezpośrednio przy uruchomieniu.

### Jak zbudować i uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd projekt-ubuntu
2. Zbuduj obraz:

   ```Bash
   docker build -t moje-ubuntu:v1 .
3. Uruchom efemeryczny kontener testowy:

   ```Bash
   docker run --rm moje-ubuntu:v1
## Projekt 7: Orkiestracja wielokontenerowa za pomocą Docker Compose

### Opis projektu
Projekt przedstawia w pełni zautomatyzowane uruchamianie wielowarstwowego środowiska (Baza danych PostgreSQL + Panel administracyjny pgAdmin 4) za pomocą jednego pliku konfiguracyjnego `docker-compose.yml`. Konfiguracja definiuje izolowaną sieć wirtualną dla bezpiecznej komunikacji między kontenerami oraz trwały wolumen zarządzany przez Dockera, chroniący stan bazy danych przed usunięciem podczas restartu usług. Projekt eliminuje potrzebę ręcznego wpisywania sekwencji komend `docker run`.

### Jak uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd projekt-compose
2. Uruchom całą infrastrukturę w tle:
   ```Bash
   docker compose up -d
3. Zatrzymaj i usuń strukturę środowiska:
   ```Bash
   docker compose down
## Projekt 8: Własny mikroserwis (Python + Redis) zarządzany przez Compose

### Opis projektu
Projekt przedstawia zaawansowane użycie Docker Compose do automatycznego budowania (parametr `build: .`) własnej aplikacji napisanej w Pythonie (Flask) na podstawie lokalnego pliku `Dockerfile` oraz jednoczesne łączenie jej z gotową bazą danych w pamięci podręcznej (Redis). Aplikacja zlicza odwiedziny użytkowników, zachowując stan licznika w bazie Redis. Kontenery komunikują się wewnątrz odizolowanej sieci wirtualnej.

### Jak uruchomić?
1. Przejdź do katalogu projektu:
   ```bash
   cd moj-mikroserwis
2. Zbuduj i uruchom środowisko:
   ```Bash
   docker compose up -d --build

## Projekt 9: Zaawansowany i bezpieczny mikroserwis Node.js (Praktyka Dockerfile)

### Opis projektu
Projekt skupia się na wdrożeniu dobrych praktyk produkcyjnych (*Production-Ready*) podczas budowania obrazów za pomocą Dockerfile oraz orkiestracji w Docker Compose. Środowisko składa się z aplikacji webowej w Node.js oraz bazy danych Redis spiętych we wspólnej sieci wirtualnej.

### Kluczowe pojęcia i praktyki wdrożone w projekcie:
1. **Optymalizacja pamięci podręcznej (Docker Cache/Layers):** Plik `Dockerfile` został podzielony tak, aby instrukcje rzadko zmieniane (instalacja zależności przez `npm install`) były wykonywane przed kopiowaniem kodu źródłowego (`server.js`). Dzięki temu edycja kodu aplikacji nie powoduje ponownego pobierania pakietów z internetu, a budowanie obrazu trwa ułamek sekundy.
2. **Bezpieczeństwo kontenera (Non-root User):** Domyślnie Docker uruchamia procesy jako superadministrator (`root`). W tym projekcie, po wykonaniu zadań instalacyjnych przez roota, uprawnienia są celowo obniżane za pomocą instrukcji `USER node`. W przypadku przejęcia kontenera, haker ma ograniczone pole manewru.
3. **Porządek strukturalny:** Wykorzystanie instrukcji `WORKDIR` zapobiega mieszaniu plików aplikacji z plikami systemowymi Linuxa wewnątrz kontenera.

### Jak uruchomić i przetestować bezpieczeństwo?
1. Uruchomienie środowiska:
   ```bash
   docker compose up -d
2. Test bezpieczeństwa użytkownika (powinien zwrócić node, a nie root):
   ```Bash
   docker exec -it serwis_web whoami
