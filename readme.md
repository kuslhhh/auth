# AUTHENTICATION

## Frontend


To install dependencies: 

```bash
cd frontend && bun install
```

Update .env.local file
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

To run:
```
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Backend

```bash
cd backend
```

To install dependencies: 

```bash
bun install 
```

Start database locally
```
docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=postgres postgres
```

Copy .env.example to .env
```
  cp .env.example .env
```

Update .env creds
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
...
```

Migrate the db
```
  bunx prisma migrate dev
```

To run:

```bash
bun run index.ts 
```
or 
```bash
bun run dev 
```




