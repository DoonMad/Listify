# Listify

Listify is a simple yet functional multi-list organizer built using **React Native** and **Expo**. It allows users to create multiple lists (e.g., groceries, work, to-dos) and manage tasks within them. This was my first full-fledged app project where I focused on learning core concepts of mobile app development, state management, navigation, and data persistence.

---

## Features

* Create and manage multiple custom lists
* Add, complete, and delete tasks in each list
* Long press on list cards to delete them
* Data persists locally using AsyncStorage
* Neat and minimal UI with Tailwind-like utility classes
* Simple modal interface for adding new lists

---

## Tech Stack & Libraries

* **React Native** (with Expo)
* **TypeScript**
* **AsyncStorage** (for local persistence)
* **Expo Router** (for screen navigation)
* **Tailwind CSS classes** via `nativewind`
* **Icons** via `@expo/vector-icons` (Ionicons)

---

## Screenshots

```
<!-- ![Home Screen](screenshots/home.png)
![List View](screenshots/list.png) -->
```

---

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/Listify.git
```

2. Navigate to the project folder:

```bash
cd Listify
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npx expo start
```

5. Scan the QR code with Expo Go app or run it on an emulator.

---

## How to Build the App

To build an installable version (APK, AAB, etc.):

1. Run the following command:

```bash
npx expo export --dev-client
```

2. Or for EAS builds:

```bash
eas build -p android
```

> Make sure to configure EAS and link your Expo account. See [Expo Build Docs](https://docs.expo.dev/build/introduction/).

---

## Learning & Credits

This app helped me learn:

* React Native fundamentals
* State and props handling
* AsyncStorage and persistence
* Modular component structure
* Navigation between screens
* FlatList optimization

---

## Future Improvements

* [ ] Improve UI with better design and color scheme
* [ ] Add feature to rename lists
* [ ] Fix issue: Task count not updating accurately
* [ ] Add due dates, reminders, and priorities for tasks
* [ ] Option to reorder tasks within a list

Feel free to open issues or contribute to make this app better.

---
