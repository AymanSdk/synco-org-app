# Syncro Org

<!-- Used Tech -->
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,vercel,nodejs" alt="Tech Stack" />
</p>

**Syncro Org** is a lightweight, simplified application for team communication. It allows users to create and manage workspaces, organize channels within them, and easily manage members. With support for OAuth integration via GitHub and Google, Syncro Org provides a smooth and secure user experience.

## Screenshots


## Features

- **Workspace Creation**: Users can create multiple workspaces for organizing teams or projects.
- **Channel Management**: Create and manage channels within each workspace for more focused conversations.
- **OAuth Authentication**: Secure login using GitHub and Google OAuth methods for user convenience.
- **Member Management**: Easily add and manage members within workspaces, providing full control over user roles and permissions.
- **Real-Time Communication**: Stay connected with your team via real-time updates.

## Tech Stack

- **Frontend**: Built with [Next.js](https://nextjs.org/) for a fast and scalable React framework.
- **Backend**: Powered by [Convex](https://convex.dev/) to handle real-time data and serverless backend services.
- **Languages**: TypeScript is used for both the front-end and back-end to ensure type safety and developer productivity.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AymanSdk/synco-org-app
   cd synco-org-app
   ```

2. **Install dependencies:**

   Ensure you have [Bun](https://bun.sh/) installed, then run:

   ```bash
   bun install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project with the following variables:

   ```bash
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
   NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_github_client_secret
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. **Run the development server:**

   Start the server locally:

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Authentication

Syncro Org leverages OAuth 2.0 authentication with GitHub and Google. To enable this:

1. **GitHub OAuth Setup**:

   - Navigate to [GitHub Developer Settings](https://github.com/settings/developers) and create a new OAuth app.
   - Set the callback URL to: `http://localhost:3000/api/auth/callback/github`.
   - Obtain the client ID and secret, then update the `.env.local` file.

2. **Google OAuth Setup**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/), create a new project, and enable OAuth credentials.
   - Set the authorized redirect URIs to: `http://localhost:3000/api/auth/callback/google`.
   - Update the `.env.local` file with the generated client ID and secret.

## Backend: Convex Setup

Syncro Org uses [Convex](https://convex.dev/) to manage real-time data. Set up Convex by following these steps:

1. Install the Convex CLI:

   ```bash
   bun add -g convex
   ```

2. Initialize Convex within the project:

   ```bash
   convex init
   ```

3. Deploy your Convex backend:

   ```bash
   convex deploy
   ```

4. Add the Convex URL to your `.env.local` as `CONVEX_URL`.

## Deployment

You can deploy Syncro Org using platforms such as Vercel or Netlify. For deployment on Vercel:

1. Push your repository to GitHub or another Git provider.
2. Connect your repository to Vercel.
3. Ensure you add the required environment variables on the Vercel dashboard.
4. Deploy the app with Vercel's seamless integration.

## Contributing

We welcome contributions to Syncro Org! If you want to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
