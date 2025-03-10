# The Cave

&#x20;

## 🕹️ About The Cave

The Cave is an experimental 3D web application built using **React Three Fiber** and **Three.js**. It serves as a playground for exploring 3D graphics, shaders, and mathematical concepts in WebGL. The project aims to push the boundaries of interactive 3D experiences in the browser.

## 🚀 Features

- 🌐 **React Three Fiber** for declarative 3D scene management
- 🎨 **Custom shaders** and material effects
- 🔢 **Mathematical foundations** applied to 3D rendering
- 🎮 **Interactive elements** for user engagement
- 🏗️ **Modular architecture** for easy extensibility
- ⚡ **Backend API** built with Go and PostgreSQL

## 🛠️ Tech Stack

### Client

- **React & React Three Fiber** – for managing the 3D scene
- **Three.js** – for low-level 3D rendering
- **TypeScript** – for type safety and maintainability
- **Vite** – for fast development and bundling
- **GLSL** – for writing custom shaders

### Server

- **Go (Golang)** – for a robust and performant backend
- **PostgreSQL** – for relational database storage
- **Gin** – for a lightweight web framework
- **pgx** – for PostgreSQL driver and query builder
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

This project is designed to improve skills in:

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
