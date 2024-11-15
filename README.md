 # Aplikacja Treebie  
**Nazwa aplikacji:** Treebie  
**Twórcy:** Jakub Lagierski, Filip Skoczylas, Jan Niewiadomski, Tymon Wilczewski  

Aplikacja pozwala na wykonywania ekologicznych wyzwań, za które można odbierać punkty i ulepszać swoje drzewko. Aplikacja jest skierowana dla każdego, kto chce się przyczynić dla dobra planety.
W tym formacie, dobre uczynki przestają być nudne i pozwalają na bardziej przystępne podejście do ekologii. Aplikacja jest przeznaczona na platformy iOS oraz Android.

## Spis treści
1. [Instalacja](#instalacja)
2. [Struktura plików](#struktura-plikow)
3. [Wykorzystane technologie](#wykorzystane-technologie)
4. [Funkcjonalności](#funkcjonalnosci)

## Instalacja

1. Sklonuj repozytorium

```bash
git clone https://github.com/Fivlas/treebie.git
cd treebie
```

2. Pobierz potrzebne zależności

   ```bash
   npm install
   ```

3. Uruchom aplikację

   ```bash
    npx expo start
   ```

W wynikach znajdziesz opcje otwierania aplikacji w formacie:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Struktura plików
 ```bash
treebie/
├───.expo
│   └───types
├───app
│   ├───(auth)
│   ├───(tabs)
│   ├───ai
│   ├───all
│   ├───challenge
│   │   └───[id]
│   └───tip
│       └───[id]
├───assets
│   ├───fonts
│   ├───images
│   └───jsons
├───components
│   ├───Ai
│   ├───Challenges
│   ├───elements
│   ├───HomePage
│   ├───LoginSignup
│   ├───navigation
│   ├───TipsPage
│   └───__tests__
│       └───__snapshots__
├───constants
├───Documentation
│   ├───app
│   │   ├───(auth)
│   │   ├───(tabs)
│   │   ├───ai
│   │   ├───all
│   │   ├───challenge
│   │   └───tip
│   ├───components
│   │   ├───Ai
│   │   ├───Challenges
│   │   ├───constants
│   │   ├───elements
│   │   ├───HomePage
│   │   ├───LoginSignup
│   │   ├───navigation
│   │   └───TipsPage
│   ├───functions
│   └───hooks
├───functions
├───hooks
├───scripts
└───styles
```
## Części aplikcji
Aplikacja składa się z 4 głównych części. Są to strona główna, wyzwania, drzewko oraz ustawienia.  
### Strona główna  
+ Jest to główna strona aplikacji, która zapewnia dostęp do porad dotyczących ekologii oraz interaktywny czat z chatbotem AI, który może odpowiadać na pytania użytkownika i udzielać ekologicznych wskazówek.
+ Użytkownik może zobaczyć najnowsze porady ekologiczne oraz rozmawiać z AI, aby uzyskać dodatkowe porady lub sugestie. Strona ta stanowi centralne miejsce interakcji z aplikacją i ekologicznymi treściami.
### Wyzwania
## Wykorzystane technologie

### Aplikacja wykorzystuje następujące technologie i biblioteki:
- **React Native** - framework do budowania aplikacji mobilnych.
- **TypeScript** - statyczne typowanie i większa czytelność kodu.
- **React Navigation** - zarządzanie nawigacją między ekranami.
- **Expo** - ułatwia konfigurację i testowanie aplikacji.
- **Firebase** - nierelacyjna baza danych, przechowująca dane aplikacji

### Typowanie z TypeScript

W projekcie wykorzystano **TypeScript** do poprawienia czytelności kodu i minimalizacji błędów. Typy i interfejsy są zorganizowane w katalogu `treebie/typing.d.ts`, a przykładowe interfejsy obejmują:

- **TipData** - interfejs obsługujący właściwości wskazówek ekologicznych
- **ChallengeData** - interfejs obsługujący właściwości wyzwań ekologicznych

### Baza danych 

W aplikacji wykorzystano nierelacyjną bazę danych Firestore. Pozwala ona na szybkie i kompleksowe przechowywanie, zarządzanie oraz przeglądanie danych.  
W bazie danych istnieje 4 tabele (kolekcje) z polami:  
+ **likedTips** - kolekcja przechowuje dane o polubionych poradach
  + timestamp (number) - czas dodania do polubionych  
  + tipId (string) - id polubionej porady  
  + userId (string) - id użytkownika, który polubił poradę  
+ **quests** - kolekcja przechowuje dane o wyzwaniach:  
  + title (string) - tytuł (nazwa) wyzywania
  + pointsToGain (number) - punkty za wykonanie zadania
  + difficultyName (string) - pisemna nazwa poziomu trudności wyzwania
  + difficultyLevel (number) - poziom trudności wyrażony jako liczba
  + description (string) - opis wyzywania
  + challengeGroup (string) - grupa do której zalicza się wyzywanie  
+ **tips** - kolekcja przechowuje dane o dostępnych ekologicznych poradach  
  + title (string) - tytuł (nazwa) porady 
  + list (array) - tablica przechowująca konkretne wskazówki
  + imageName (string) - adres URL do wyświetlanego zdjęcia
  + description (string) - opis porady  
+ **users** - kolekcja przechowuje dane o użytkownikach  
  + currentQuest (string) - przechowuje id obecnie wykonywanego zadania
  + email (string) - email użytkownika
  + likedTips (array) - tablica przechowująca polubione porady przez użytkownika
  + questsDone (array) - tablica przechowująca wykonane wyzwania
  + team (number) - id wybranego drzewa użytkownika (1 lub 2)
  + treeProgress (number) - punkty doświadczenia uzyskiwane przez wykonanie zadań  


## Funkcjonalności  
### Użytkownik  
System kont w aplikacji mobilnej pozwala użytkownikom tworzyć, logować się i zarządzać swoim indywidualnym profilem w aplikacji. Oto najważniejsze możliwości, jakie oferuje system kont:  
  + **Rejestracja i logowanie**: Umożliwia nowym użytkownikom tworzenie kont i logowanie się na istniejące konta za pomocą adresu e-mail oraz hasła.  
  + **Zarządzanie danymi**: Użytkownicy mogą przeglądać swoje polubione porady czy zmieniać motyw  co pozwala na personalizację i lepsze dopasowanie aplikacji do potrzeb.  
  + **Bezpieczeństwo i prywatność**: System kont umożliwia bezpieczne przechowywanie danych oraz zarządzanie sesjami logowania, co zwiększa ochronę kont użytkowników.  
System kont zwiększa użyteczność i funkcjonalność aplikacji, umożliwiając lepsze dostosowanie jej do indywidualnych potrzeb użytkowników oraz ich ochronę.
### Wyzwania  
System wyzwań w aplikacji umożliwia użytkownikom realizację określonych zadań, za które zdobywają punkty doświadczenia (XP), co powoduje rośnięcie własnego drzewka oraz motywuje użytkownika do regularnego korzystania z aplikacji. Poniżej główne możliwości takiego systemu:  
+ **Różne typy wyzwań**: Wyzwania mają różny stopień trudności (łatwy, średni, trudny) oraz kategorie (challengeGroup) np. Sadzenie, Zbieranie, Zakupy  
+ **Nagrody za wykonanie**: Za ukończenie wyzwań użytkownicy zdobywają punkty doświadczenia, które powodują rośnięcie drzewa i zwiększenie poziomu. Taki system wyzwań poprawia zaangażowanie użytkowników, ułatwia śledzenie postępów i pozwala na połączenie przyjemnej rozgrywki z pożytecznym wpływem na środowisko.
### Porady
Porady w aplikacji mobilnej umożliwia użytkownikom przeglądanie ekologicznych porad w przystępny sposób. Użytkownicy mogą odkrywać różnorodne wskazówki związane z dbaniem o środowisko, a także zapisywać ulubione, by łatwo do nich wrócić.  
+ **Przeglądanie i odkrywanie porad**: Użytkownicy mogą przeglądać listę ekologicznych porad, które są wyświetlane w formie kafelków. Każda porada zawiera krótki opis oraz przyciągającą uwagę grafikę, aby zachęcić do jej przeczytania.
+ **Polubienie porad**: Każda porada posiada opcję „polubienia”, co pozwala użytkownikom na zapisanie interesujących ich treści. Dzięki temu użytkownik może stworzyć własną listę ulubionych porad, co ułatwia powrót do najważniejszych informacji.
+ **Graficzna prezentacja**: Każda porada posiada dedykowany obraz, który nie tylko wzbogaca wizualnie aplikację, ale także zwiększa zrozumienie porady, dając użytkownikowi skojarzenie z konkretnymi działaniami.
### AI
W aplikacji mobilnej oferującej ekologiczne porady, dodaliśmy funkcję Chat z AI, która umożliwia użytkownikom interakcję z inteligentnym asystentem.
+ **Opcja wyszukiwania**: Gdy użytkownik kliknie w ikonę lupy przy oknie tekstowym na głównej stronie, otwiera się dedykowany chat z AI.
+ **Rozmowa z AI**: Użytkownik może zadawać pytania dotyczące ekologii, zrównoważonego stylu życia i ochrony środowiska, a AI natychmiast udziela odpowiedzi, sugerując praktyczne porady i wskazówki.
+ **Odkrywanie nowych treści:**: Zamiast pasywnie przeglądać porady, użytkownik może aktywnie rozmawiać z AI, co zwiększa zaangażowanie i skuteczność nauki.

![start screen](https://github.com/Fivlas/treebie/blob/main/assets/images/readmeImgs/startScreen.png?raw=true)
<img src="https://github.com/Fivlas/treebie/blob/main/assets/images/readmeImgs/startScreen.png?raw=true" alt="Start screen" style="width:50%; height:auto;">
