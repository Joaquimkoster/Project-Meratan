# versão 0.0.1

- ambiente: java 25, spring boot 4.2.0, react, typescript e vite. node `^20.19.0 || >=22.12.0`.
- backend: em `backend/`, execute `./mvnw spring-boot:run`. acesso local: `http://127.0.0.1:8080`.
- frontend: em `frontend/`, execute `npm ci` e `npm run dev`. acesso usual: `http://localhost:5173`.
- rota: `get /api/health` retorna `{"status":"ok","versao":"0.0.1"}`.
- banco: h2 em `backend/data/meratan.mv.db`, usuário `sa`, senha vazia. inicie sempre dentro de `backend/` para usar o mesmo arquivo; os dados não vão para o git.
- configuração: `backend/src/main/resources/application.properties`; proxy `/api` em `frontend/vite.config.ts`.
- estado: base inicial, sem autenticação ou funcionalidades de investigação.
