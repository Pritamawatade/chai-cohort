# 🚀 LeetCode Clone Setup Guide (Windows + WSL + Docker + PostgreSQL + Judge0)

**Audience**: CS students and developers building a LeetCode-style code execution platform using Express.js, PostgreSQL, Docker, WSL, and Judge0.

---

## ⚙️ Step 1: Setting Up WSL (Windows Subsystem for Linux)

### 1. Enable WSL
Launch PowerShell as Administrator (right-click Start > Windows PowerShell (Admin)).

Run this command:
```bash
wsl --install
```
This installs WSL with Ubuntu as the default Linux distribution.

### 2. Restart Your Computer
WSL setup will prompt you to restart. Go ahead and do it.

### 3. Finish Ubuntu Setup
Open Ubuntu from the Start menu.

Set your UNIX username and password when prompted.

### 4. Update Ubuntu
```bash
sudo apt update && sudo apt upgrade -y
```

### 5. (Optional) Fix Docker compatibility with cgroup settings
Edit the GRUB configuration:
```bash
sudo nano /etc/default/grub
```
Change this line:
```bash
GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=0"
```
Save & exit (Ctrl + O, Enter, then Ctrl + X).

Run:
```bash
sudo update-grub
sudo reboot
```

---

## 🐳 Step 2: Install Docker & Docker Compose on Ubuntu

### 1. Install Docker
```bash
sudo apt update && sudo apt install -y docker.io
```

### 2. Install Docker Compose
```bash
sudo apt install -y docker-compose
```

### 3. Start Docker Service (on every boot or manually)
```bash
sudo service docker start
```

---

## 🛢️ Step 3: Set Up PostgreSQL Database in Docker

### 1. Run PostgreSQL in Docker
```bash
sudo docker run --name my-postgres \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=mypassword \
    -p 5432:5432 -d postgres
```
⚠️ Avoid using special characters in passwords to prevent connection issues.

### 2. Check Container is Running
```bash
sudo docker ps
```

---

## 🔧 Step 4: Configure Prisma with PostgreSQL

### 1. Install Prisma
```bash
npm i prisma @prisma/client
```

### 2. Initialize Prisma
```bash
npx prisma init
```
This creates a `prisma/` folder and `.env` file.

### 3. Configure `DATABASE_URL` in `.env`
```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/postgres"
```

### 4. Prisma Commands Flow

#### Generate Prisma Client
```bash
npx prisma generate
```
Creates a client for interacting with your DB.

#### Create Migration (optional for SQL schema)
```bash
npx prisma migrate dev --name init
```
Creates a new migration and pushes it to the DB.

#### Push Prisma Schema to DB (no migration file)
```bash
npx prisma db push
```
Directly updates the DB with the schema (quick and dirty).

---

## ⚖️ Step 5: Setting Up Judge0 Code Execution Engine in WSL

### 1. Download Judge0
```bash
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
```

### 2. Unzip the Archive
```bash
unzip judge0-v1.13.1.zip
cd judge0-v1.13.1
```

### 3. Edit Judge0 Configuration
```bash
nano judge0.conf
```
Update the following:
```conf
REDIS_PASSWORD=yourredispassword
POSTGRES_PASSWORD=yourdbpassword
```
🔐 Use strong but simple passwords (no symbols like `@`, `$`, etc.).

### 4. Start Judge0 Services in Docker

Start Redis and PostgreSQL first:
```bash
sudo docker-compose up -d db redis
```

Give it a moment:
```bash
sleep 10s
```

Start remaining services:
```bash
sudo docker-compose up -d
sleep 5s
```

### 5. Verify Installation
Open your browser:
```
http://localhost:2358/docs
```
You should see the Swagger API UI of Judge0 ✅

---

## 🧠 Pro Tips

- Use `Ctrl + C` to stop any running service in the terminal.
- Use `sudo docker-compose down` to stop and remove containers.
- Don’t forget to use `sudo service docker start` when you reboot WSL.
- Use tools like Postman or REST Client to test Judge0 endpoints.

---

## 🧾 Final Thoughts

You’ve just built the backend infrastructure of a LeetCode-style app from scratch! Now go ahead and integrate it with Express.js or any frontend of your choice. The real fun (and bugs) begin now 😉.

**Happy Coding!** 💻⚔️