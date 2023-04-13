# ReactJS Demo - Magic Wallet Services + Firebase Auth

Deployed URL: [https://mws-firebase-demo.vercel.app/](https://mws-firebase-demo.vercel.app/)

ReactJS, Magic Web SDK and Firebase Auth
Use Firebase Auth for user authentication, and Magic for wallet creation and key management.

## Prerequisites

A. Firebase

1. Create a [Firebase account](https://firebase.google.com/).
2. Go to the [console](https://console.firebase.google.com/) and create a project by clicking "Add project."
3. In the "Project Overview" page, add a Web app to get started and register your app by giving it a nickname.
4. Add a Firebase SDK (via npm or script tag) and retain your app's Firebase configuration held in `firebaseConfig`.
5. Click on "Project settings" under the settings of "Project Overview," and retain the `Project ID`.
6. In the Project Overview page, choose the Authentication product to add to your application.
7. Click "Get Started" and under the "Sign-in method" tab, enable "Email/Password" under "Native providers".
8. Link to [Firebase Auth JavaScript Web API documentation](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=en#auth_package)

B. Magic

1. Create a [Magic account](https://magic.link/).
2. Create a Magic Auth application and retain the `Publishable API Key`.
3. Link to [Magic Web API docs](https://magic.link/docs/auth/api-reference/client-side-sdks/web).

C. Magic MWS Setup

1. Contact Magic and provide the Firebase `Project ID` and Magic `Publishable API Key`.
2. Magic will return a `Provider ID`, please retain this.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**Before you install:** please read the [prerequisites](#prerequisites)

Stary by cloning this repo on your local machine:

```bash
$ git clone git@github.com:ayv8er/MWS-Auth0-Demo.git
# or
$ cd PROJECT
```

To install and set up the library, run:

```bash
$ npm install
# or
$ yarn add
```

## Serving the app

```bash
$ npm run dev
# or
$ yarn dev
```

## Env setup

Insert the following values obtained in the [prerequisites](#prerequisites) section, into the `.env` file

```
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=
NEXT_PUBLIC_MAGIC_PROVIDER_ID=
NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
NEXT_PUBLIC_AUTH0_SECRET_ID=
```

## \_app.js

In the Auth0Provider, pass values into the `domain` and `clientId` keys. Pass "http://localhost:3000" as value into `appOrigin` and `redirectUri`.

## index.js

In the Magic constructor, pass env values into...

```
const magicClient = new Magic(<Magic_Publishable_API_Key>)
```

In the Magic loginWithOIDC method, pass env values into...

```
const did = await magic.openid.loginWithOIDC({
    jwt: <Auth0_User_ID_Token>,
    providerId: <Magic_Provider_ID>
})
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
