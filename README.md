# Demo Store with Commerce.js and Next.js 🛍️💳

A high-fidelity fully-fledged eCommerce demo store built using the Commerce.js SDK and Next.js with live deployment to Vercel.

Checkout the live demo [here]()

**Note**
- This app is built using Commerce.js v2 SDK

## Overview

This README will guide you in getting up and running with a fully-fledged eCommerce template. We have configured this template for you to one-click deploy directly to Vercel. Alternatively, you can manually deploy to your choice of hosting platform.

For a full detailed tutorial on building this JAMstack eCommerce application, please head on over [here](tutorial-url).


## Prequisites

- IDE or code editor of your choice
- Node (v8.2.0 or higher)
- NPM or Yarn
- Chec CLI `yarn global add @chec/cli`

## Setup

### Create a Chec account. 

Now that you’ve installed Chec CLI globally, you will be able to access the list of `chec [COMMANDS]`, one of which is registering for a Chec account. Let’s go ahead and get that set up!

```bash
# Open the Chec registration page in your browser
chec register
```

Follow the rest of the walk-through to set up your merchant details. Alternatively, you can go [here](https://authorize.chec.io/signup) to register for a Chec account. 


## One-click Deploy with Vercel (recommended)

The one-click deploy allows you to connect Vercel to your GitHub account to clone the `commercejs-nextjs-vercel` repository and deploy it automatically. Be sure to go to [Vercel](https://vercel.com/signup) and sign up for an account before clicking the deploy button.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/chec/commercejs-nextjs-vercel)

Please note that the site deploy will first fail as we have yet to enter in the environment variables for your Vercel site. Configure your site by going under the **Build and Deploy** settings then **Environment** to enter the API key. The value is automatically encrypted and stored in Vercel system. The key input is **CHEC_PUBLIC_KEY** and the value input is the Public Key. Please note that for the purpose of getting you up and running with a live deploy preview of the demo store, we have provided you with the public_key from our demo merchant account. Access this key [here](https://github.com/chec/commercejs-nextjs-vercel/blob/master/.env.example) and copy over the `CHEC_PUBLIC_KEY` value.

## Manual setup and Vercel deployment

Manual setup involves cloning the repo into your local environment, seeding the provided sample data into your Chec account and deploying to Vercel.

**STEP 1.** Clone the repo

```bash
# Clone the repository locally, optionally rename the repo, change into the directory
git clone https://github.com/chec/commercejs-nextjs-vercel.git chec-store 
cd chec-store
```

**STEP 2.** Install dependencies

```bash
# Install dependencies included in `package.json`.
yarn
```

**STEP 3.** Set up your environment variables

Replace the sample `.env.example` dotenv file at the root of the project to store your Chec public_key as well as your secret_key.

```bash
# Copy from source file to destination file .env
cp .env.example .env
```

You can access your API key under in your Chec dashboard setup, then navigate to the Develop tab to copy your Public Key and Secret Key. Replace the provided `CHEC_PUBLIC_KEY` with your own and fill in your `CHEC_SECRET_KEY` in the `.env` file. The secret key is necessary for the seed script to have the proper permission to seed the sample data in `/seeds` into your Chec account. Remove the secret key once the data is seeded.

```js
// .env

# Fill in your public key and secret key
CHEC_PUBLIC_KEY=
CHEC_API_URL=https://api.chec.io
# Secret key is used with chec/seeder to access your Chec account to seed it with sample data
CHEC_SECRET_KEY=
NODE_ENV=
```

This file is meant to not be committed to source control and also will be hidden in file browsers. Be sure to add your `.env` containing your API key to `.gitignore`. Lastly, commit your local repository to git.

**STEP 4.** Seed the data necessary to power your Chec store and start your development environment
```bash
# Seed data in /seeds into your Chec account
yarn seed
# Run your development environment on http://localhost:3000
yarn dev
```

Your site should now be populated with the sample data!

**STEP 5.** Make any necessary changes you need and push the code to a repository on Github or your choice of platform.

**STEP 6.** Deploy your site

Be sure to sign up for a Vercel account and log in to it. Navigate to “New site from Git” and give access to select your repo. Now go ahead and click the "deploy site" to see your live site!

Please note that the site deploy will first fail as we have yet to enter in your environment variables for your Vercel site. Configure your site by going under the **Build and Deploy** settings then **Environment** to enter your API key. The value is automatically encrypted and stored in Vercel system. The *key* input is **CHEC_PUBLIC_KEY** and *value* input is your **Public Key**. You can access your Chec public key as explained in the manual setup above. 

## 🥞 Stack

- Framework - [Next.js](https://nextjs.org)
- eCommerce - [Chec/Commerce.js](https://commercejs.com)
- Hosting - [Vercel](https://vercel.com)
- Styling - Bootstrap and SASS

## Customization and Extendability

- Add shipping zones and enable shipping options in each product
- Adding new features or extending existing features
- Customizing the styling
    - All global styles are done using SASS and Bootstrap
- A/B testing unique checkout designs and flow
- Integrating other backend tools like Content Management Systems, Customer Support, Fulfillment services, and more.
- Fetching real client reviews from reviews APIs
- Adding search functionality
- Leveraging webhooks to automate post checkout actions
