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

## Autoryzacja
### Index  

Komponent `Index` reprezentuje ekran powitalny aplikacji mobilnej Treebie. W przypadku wykrycia zalogowanego użytkownika przekierowuje do głównego ekranu aplikacji; dla niezalogowanych wyświetla logo i przycisk umożliwiający przejście do ekranu logowania.

### Importowane moduły i komponenty

* `CustomButton` - przycisk dostosowany do stylu aplikacji, umożliwiający nawigację.
* `useUser` - hook do pobrania informacji o zalogowanym użytkowniku.
* `Href`, `Redirect`, `router` - moduły `expo-router` do obsługi nawigacji i przekierowań.
* `Image`, `ImageBackground`, `View`, `Text` - komponenty React Native do struktury i wyświetlania grafiki oraz tekstu.

### Logika komponentu

Komponent korzysta z hooka `useUser`, aby pobrać stan użytkownika:
* Jeśli użytkownik jest zalogowany (`user` istnieje), następuje przekierowanie (`Redirect`) na stronę główną, `/(tabs)/`.
* Jeśli użytkownik nie jest zalogowany, wyświetlana jest zawartość ekranu powitalnego.

### Struktura renderowania

* Zawartość osadzona jest w `View` o klasie `flex-1` dla pełnego dopasowania do wysokości ekranu.
* `ImageBackground` ustawia tło ekranu, pobierając obraz `banner-image.png` i nadając mu kolor bazowy.
* Widok z logo i tytułem aplikacji zawiera:
  ** `Image` z pliku `logo-icon-new.png`, wyświetlany na środku ekranu,
  ** `Text` z nazwą aplikacji, `Treebie`, wyróżniony jako centralny tytuł.
* Przycisk `CustomButton` na dole ekranu o tytule "Dołącz", przekierowuje do ekranu logowania, `/(auth)/login`, przy użyciu `router.replace`.

### Przykład użycia

```javascript
import Index from './Index';

export default function App() {
    return (
        <Index />
    );
}
```
### Login  

Komponent `Login` umożliwia logowanie użytkownika w aplikacji mobilnej zbudowanej w React Native z wykorzystaniem Firebase. Zawiera formularz logowania z obsługą błędów i logiką uwierzytelniania użytkownika.

## Importowane moduły i komponenty

- **React Native UI i funkcjonalności**:
  - `View`, `SafeAreaView`, `TouchableOpacity`, `Text`, `Alert` - komponenty używane do tworzenia interfejsu użytkownika.
  - `useState` - hook React do zarządzania stanem komponentu.
  - `LoginSignupHeader` - komponent nagłówka logowania/rejestracji.
  - `CustomInput`, `CustomButton` - komponenty niestandardowe obsługujące pola wejściowe i przyciski.
  - `router` - moduł do nawigacji między ekranami.
  - `LoginSignupFooter` - komponent stopki logowania/rejestracji.

- **Firebase**:
  - `signInWithEmailAndPassword`, `sendEmailVerification` - funkcje Firebase Authentication do logowania oraz wysyłania e-maila weryfikacyjnego.
  - `AsyncStorage` - moduł do przechowywania danych na urządzeniu.
  - `doc`, `getDoc`, `setDoc`, `updateDoc` - funkcje Firebase Firestore do zarządzania dokumentami w bazie danych.

- **Dodatkowe komponenty i hooki**:
  - `ChoseTeam` - komponent wyboru zespołu użytkownika.
  - `useThemeColor` - hook do pobrania koloru tła na podstawie motywu aplikacji.
  - `FIREBASE_AUTH`, `FIREBASE_DB` - instancje Firebase Authentication oraz Firebase Firestore.

## Stan komponentu

- `email` - przechowuje wprowadzony przez użytkownika adres e-mail.
- `password` - przechowuje hasło użytkownika.
- `loading` - wskazuje, czy trwa proces logowania.
- `isChosingTeam` - informuje, czy użytkownik powinien wybrać zespół po zalogowaniu.
- `backgroundColor` - kolor tła ekranu, dostosowany do motywu aplikacji.

## Funkcje

### `signIn`

Asynchroniczna funkcja do obsługi logowania użytkownika.
- Uwierzytelnia użytkownika przy użyciu `signInWithEmailAndPassword`.
- Wysyła e-mail weryfikacyjny, jeśli e-mail nie jest zweryfikowany.
- Zapisuje dane użytkownika (`uid`, `email`) w `AsyncStorage`.
- Pobiera dokument użytkownika z Firestore i sprawdza, czy użytkownik przypisany jest do zespołu.
- Obsługuje błędy związane z logowaniem, wyświetlając odpowiednie komunikaty.

### `handleSignupPress`

Obsługuje nawigację do ekranu rejestracji użytkownika, wywołując `router.replace("/signup")`.

### `handleTreeSelect`

Przypisuje wybrany zespół do konta użytkownika.
- Aktualizuje dokument użytkownika w Firestore.
- Przekierowuje użytkownika do głównego ekranu aplikacji.

## Struktura renderowania

Komponent wyświetla różne elementy interfejsu użytkownika w zależności od wartości `isChosingTeam`:

- Gdy `isChosingTeam` jest `true`, wyświetla komponent `ChoseTeam`, umożliwiający użytkownikowi wybór zespołu.
- Gdy `isChosingTeam` jest `false`, wyświetla formularz logowania z:
  - `CustomInput` dla adresu e-mail i hasła,
  - `CustomButton` dla przycisku logowania,
  - `TouchableOpacity` z tekstem przekierowującym do rejestracji,
  - `LoginSignupHeader` oraz `LoginSignupFooter` w górnej i dolnej części ekranu.

Całość jest otoczona w `SafeAreaView`, co zapewnia odpowiednie wyrównanie na urządzeniach z wycięciami lub zaokrąglonymi rogami.

## Uwagi

- Funkcje Firebase są asynchroniczne i mogą generować błędy; komponent zawiera obsługę typowych błędów logowania.
- `AsyncStorage` przechowuje dane logowania, co umożliwia automatyczne logowanie po ponownym uruchomieniu aplikacji.
- `useThemeColor` umożliwia dostosowanie tła do motywu aplikacji.

## Przykład użycia

```javascript
import Login from './Login';

export default function App() {
    return (
        <Login />
    );
}
```
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


