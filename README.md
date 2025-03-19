# The Cave

&#x20;

## 🕹️ About The Cave

The Cave is an experimental 3D web application. It serves as a playground of mini games and chill out areas for me and my mates. It's also a learner project for me to explore **Golang** and **React Three Fiber**.

## 🚀 Features

- 🌐 **React Three Fiber** for declarative 3D scene management
- ⚡ **Game Server** built with Golang
- 🎮 **Interactive mini games** for user engagement
- 🏗️ **Modular architecture** for easy extensibility
- ⚡ **Backend API** built with Golang and PostgreSQL

## 🛠️ Tech Stack

### Client

- **React & React Three Fiber** – for managing the 3D scenes
- **Three.js** – for low-level 3D rendering
- **TypeScript** – for type safety and maintainability
- **Tailwind** – for styling
- **ShadCn** – for web components
- **Vite** – for fast development and bundling

### Server

- **Go (Golang)** – for a robust and performant server & API
- **PostgreSQL** – for relational database storage
- **Gorilla/mux** – for a lightweight http web framework
- **pgx** – for PostgreSQL driver and query building
- **Goose** – for database migrations
- **Socket.IO** – for real-time communication
- **Docker** – for managing PostgreSQL and pgAdmin

## 📦 Installation

To run the project locally, follow these steps:

### Clone the repository

```bash
git clone https://github.com/Kezanwar/the-cave.git
cd the-cave
```

### Database Setup (Docker)

```bash
# Start PostgreSQL and pgAdmin using Docker Compose
docker-compose up -d
```

### Client Setup

```bash
cd client
# Install dependencies
yarn install # or npm install

# Start the development server
yarn dev # or npm run dev
```

### Server Setup

```bash
cd server
# Install Go dependencies
go mod tidy

# Set up environment variables (example in .env file)
# Run database migrations
goose up

# Start the server
make dev
```

## 🎮 Usage

Once the client and server are running:

- Visit the frontend at: `http://localhost:5173`
- API is available at: `http://localhost:3000`

## 📸 Screenshots

## 📖 Learning Focus

This motivation behind this project is to improve my skills in:

- Understanding **3D math** (vectors, matrices, transformations)
- Writing **custom GLSL shaders**
- Implementing **physics-based animations**
- Optimizing **performance in WebGL**
- Developing **full-stack applications** with **Go & PostgreSQL**
- Implementing **real-time communication** with **Socket.IO**
- Using **Docker** for database management

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

For questions, ideas, or collaboration, reach out to me on [GitHub](https://github.com/Kezanwar)!
