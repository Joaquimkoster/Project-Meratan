# MERATAN

> Digital Investigation and Cybersecurity Platform

**Meratan** is a **local** platform for digital investigation and forensic analysis, built to support forensic examiners and police teams. It runs entirely on the examiner's machine and sends nothing to the cloud. It brings together, in one place:

- **Case management**: investigators, scope, authorization and history
- **Evidence and chain of custody**: SHA-256 hashing on intake, read-only originals
- **Forensic analysis**: files, Windows/Linux logs, RAM, network traffic, browsers and malware
- **Timeline**: reconstruction of events from every source
- **Meratan AI**: a locally running AI that correlates results and always cites its sources
- **Reports**: technical and executive reports, with an evidence inventory

**Core principle:** the AI correlates and interprets, but it never replaces the evidence, the chain of custody or human validation.

The project will come in two forms:
- **Meratan (examiner workstation)**: an installable program (`.deb`, `.msi`).
- **Meratan Collector**: a portable version that runs straight from a USB drive, with no installation.

> Undergraduate thesis project, under development.

Development documentation (in Portuguese): [environment, routes, database and commands](Docs/README.md).

---

## Tech stack

| Part | Technology |
|---|---|
| Backend | Java 25 · Spring Boot · Spring Data JPA · Validation |
| Database | H2 (embedded SQL) · Flyway (migrations) |
| Frontend | React · TypeScript · Vite |
| Build | Maven (backend) · npm (frontend) |

---

## Project structure

```
meratan-v2/
├── backend/          # Java API (Spring Boot)
│   ├── mvnw
│   ├── pom.xml
│   └── src/main/
│       ├── java/br/com/meratan/backend/
│       └── resources/
└── frontend/         # React UI (Vite + TypeScript)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── main.tsx
        └── App.tsx
```

---

## Requirements

| Tool | Version | How to check |
|---|---|---|
| Java (JDK) | 25 (LTS) | `java -version` |
| Maven | 3.8+ | `mvn -v` |
| Node.js | 20.19+ or 22+ | `node -v` |

To install on Ubuntu:

```bash
sudo apt update
sudo apt install openjdk-25-jdk maven unzip
```

---

## How to run

The backend and the frontend run at the same time, **each in its own terminal**.

### 1. Backend (terminal 1)

```bash
cd backend
./mvnw spring-boot:run
```

The first run takes a few minutes while it downloads the dependencies. It is running when you see:

```
Tomcat started on port 8080
Started BackendApplication in X seconds
```

The backend is available at **http://127.0.0.1:8080**.

### 2. Frontend (terminal 2)

The first time, install the dependencies:

```bash
cd frontend
npm install
```

Then run it:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

During development, Vite forwards every request starting with `/api` to the backend on port 8080 (see the `proxy` setting in `vite.config.ts`).

### To stop

Press `Ctrl + C` in each terminal.

---

## Author

**Joaquim Koster**, Computer Science student.
