# NoteApp Backend

This repository contains the backend code for NoteApp, a simple yet powerful application designed to create, manage, and store notes efficiently. Built with a robust stack including Node.js, Express, and MongoDB, this backend ensures secure and scalable note management.

## Technologies & Tools

- **Node.js**
- **Express**
- **TS**
- **MongoDB**
- **Mongoose**

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm

```bash
npm install npm@latest -g
```

### Installation

1. Clone the repo

```bash
git clone https://github.com/subhajitdas1999/NoteApp.git
```

2. Navigate to the backend directory

```bash
cd NoteApp/backend
```

3. Install NPM packages

```bash
npm install
```

4. Create a .env file in the backend root directory

```bash
DATABASE_URL=mongodb+srv://yourMongoDBURI
JWT_SECRET=yourSecretKey
```

5. Run tests

```bash
npm run test
```

6. Run dev server

```bash
npm run dev
```

7. Build

```bash
npm run build
```

8. Run for production

```bash
npm run start
```

### API Documentation

```markdown
Once the server is up and running, you can use Postman or any other API client to interact with the API endpoints. Here are a few examples:

### Auth API

- `POST /signup`: Registers a new user.
- `POST /login`: Authenticates a user and returns a token.
- `POST /logout`: Logs out a user. Requires authentication token.

### Notes Api

- `POST /api/notes`: Create a new note.
- `POST /api/notes/:id/share`: Share a new note.
- `GET /api/notes`: Retrieve all notes.
- `GET /api/notes/:id`: Retrieve a single note by its ID.
- `GET /api/notes/search`: Search based on the query string
- `PUT /api/notes/:id`: Update a note by its ID.
- `DELETE /api/notes/:id`: Delete a note by its ID.
```

## Contributing

I warmly welcome contributions from the community! If you would like to contribute to the project, please follow these steps:

1. **Fork the Repository**

   - Begin by forking the repository to your GitHub account. This creates a copy of the repository where you can make your changes.

2. **Clone Your Fork**

   - Clone the forked repository to your local machine to start working on the changes.

   ```bash
   git clone https://github.com/your-username/NoteApp.git
   cd NoteApp/backend
   ```

3. **Create a New Branch**

   - Create a new branch for your changes. This keeps your modifications organized and separate from the main branch.

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Submit a Pull Request**
   - Go to the original repository you forked on GitHub, and you'll see a prompt to submit a pull request from your new branch. Click 'New Pull Request', compare the changes, and then submit it with a clear description of the changes and why they are needed.

## Frontend Development and API Documentation

I encourage developers to build their own frontend applications utilizing the NoteApp backend. The live API is accessible for integration.

### Live API URL

The backend is deployed and available at:

```bash
https://note-app-be-ipfg.onrender.com
```

## API Documentation

Currently follow the API Documentation I mentioned above.

Happy coding.
