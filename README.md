# Next.js 14 - Spotify Clone

Spotify Clone application, uses TypeScript (StandardJS), Tailwind, Supabase (Postgres), the application only has basic functionalities:

- Authentication using Supabase.
- Create songs, upload image and mp3 attachments. Attachments are uploaded to Supabase Storage.
- List, search and playback of songs.
- Favorite songs option.
- Integration with the Stripe payment platform, to be able to make recurring payments for the premium plan that allows you to upload songs.

## Configure environment variables

Rename the file **.env.template** to **.env.local**

- Supabase: Go to https://supabase.com/ create an account and then create a project. Then go to the project configuration and copy the URL, anon key and role key variables. In the database.sql file you find the SQL statements of the tables that must be entered into supabase.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_ROLE_KEY=
```

- Stripe: Go to stripe.com and sign up. After logging in, create an account. Then go to the Developers option and in the API Keys section you must copy the public and secret key. In the Webhook section you can test a local environment and then add an endpoint, where you must add the project URL, for example https://domain.com/api/webhooks, select the option to listen for events and select all the events. Then copy the content of the Signed Secret variable into STRIPE_WEBHOOK_SECRET

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

- Rebuild the node modules and build Next

```
npm install
npm run dev
```
