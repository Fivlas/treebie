# Aplikacja Treebie  
**Nazwa aplikacji:** Treebie  
**Twórcy:** Jakub Lagierski, Filip Skoczylas, Jan Niewiadomski, Tymon X  

Aplikacja pozwala na wykonywania ekologicznych wyzwań, za które można odbierać punkty i ulepszać swoje drzewko. Aplikacja jest skierowana dla każdego, kto chce się przyczynić dla dobra planety.
W tym formacie, dobre uczynki przestają być nudne i pozwalają na bardziej przystępne podejście do ekologii.

## Spis streści
1. [Instalacja](#instalacja)
2. [Struktura plików](#struktura-plikow)
3. [Wykorzystane technologie](#wykorzystane-technologie)

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
├───%ProgramData%
│   └───Microsoft
│       └───Windows
│           └───UUS
│               └───State
├───.vscode
├───app
│   ├───(auth)
│   ├───(tabs)
│   ├───ai
│   ├───all
│   ├───challenge
│   │   └───[id]
│   ├───shop
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
├───functions
├───hooks
├───scripts
└───styles
```

## Wykorzystane technologie
### Aplikacja wykorzystuje następujące technologie i biblioteki:
- **React Native** - framework do budowania aplikacji mobilnych.
- **TypeScript** - statyczne typowanie i większa czytelność kodu.
- **React Navigation** - zarządzanie nawigacją między ekranami.
- **Expo** - ułatwia konfigurację i testowanie aplikacji.
- **Firebase** - nierelacyjna baza danych, przechowująca dane aplikacji

### Typowanie z TypeScript

W projekcie wykorzystano **TypeScript** do poprawienia czytelności kodu i minimalizacji błędów. Typy i interfejsy są zorganizowane w katalogu `treebie/typing.d.ts`, a przykładowe interfejsy obejmują:

- **TipData** - interfejs obsługujący właściwosći wskazówek ekologicznych
- **ChallengeData** - interfejs obsługujący właściwosći wyzwań ekologicznych

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
  + popularity (number) - ilość razy odwiedzonej porady przez użytkowników  
  + list (array) - tablica przechowująca konkretne wskazówki
  + imageName (string) - adres URL do wyświetlanego zdjęcia
  + description (string) - opis porady  
+ **users** - kolekcja przechowuje dane o użytkownikach  
  + currentQuest (string) - przechowuje id obecnie wykonywanego zadania
  + email (string) - email użytkownika
  + likedTips (array) - tablica przechowująca polubione porady przez użytkownika
  + questsDone (array) - tablica przechowująca wykonane wyzwania
  + team (string) - id wybranego drzewa użytkownika
  + treeProgress (number) - punkty doświadczenia uzyskiwane przez wykonanie zadań


