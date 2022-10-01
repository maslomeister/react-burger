## Stellar Burgers

Online burger constructor written with Reactjs and typescript - graduation work of [React-developer](https://practicum.yandex.ru/react/) course from Yandex Practicum.

_During development project was reviewed by mentors of Yandex Practicum._

## Preview

https://user-images.githubusercontent.com/64310545/180601523-0d9f5a99-6a7f-44eb-aab5-b5ce39c4f26c.mp4

### [Open website](https://maslomeister.github.io/react-burger/)

## Stack

- **SPA** written with **Reactjs**, **functional components**, **hooks**, **typescript**
- **Framer Motion** for animations
- **React Router V6** for routing
- **React DND** for drag and dropping ingredients from menu to burger creator.
- **Redux/Toolkit** as state manager and **localStorage** for saving unfinished orders locally.
- **CSS Modules**
- **Rest api**
- **Adaptive design**
- **Websocket** with **RTK Query**
- **JWT** for authentication, authorization and protected routes.

## Description

Online burger constructor, you can drag and drop ingredients from the list on the left to the right and create your own unique burger.
You can register, login or reset forgotten password.
In your profile you can view past orders, change account data or logout.

<details>
<summary>
  
## Testing
</summary>

#### `npm run test`

Launch all unit tests

#### `E2E тесты`

In order for e2e test to work you need to create `cypress.env.json` in base directory of repo with following content:

```
{
	"email":"Your email that you used when registering",
	"password":"Your password that you used when registering",
}
```

Then do `npm start`

And after successful start of application run `npm run test:cypress`

</details>

<details>
<summary>
  
## Local start of aplication
</summary>
<br>

#### `git clone https://github.com/maslomeister/react-burger.git`

Clone the repository

#### `cd react-burger`

Navigate to the repository

#### `npm i`

Install all dependencies

#### `npm start` or `yarn start`

Start the application
Go to http://localhost:3000 to view the application

</details>
