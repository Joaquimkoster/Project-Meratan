# versão 0.0.1

- ambiente: java 25, spring boot 4.2.0, react, typescript, vite e lucide-react. node `^20.19.0 || >=22.12.0`; maven incluído pelo wrapper.
- backend: em `backend/`, execute `./mvnw spring-boot:run`. acesso local: `http://127.0.0.1:8080`.
- frontend: em `frontend/`, execute `npm ci` e `npm run dev`. acesso usual: `http://localhost:5173`.
- navegação: menu lateral com `Home` e `Forensic Analysis`. selecione `Home` para ver o estado da conexão com o backend; em `Forensic Analysis`, há as abas `File Analysis` e `Notes`.
- notas: em `Notes`, é possível criar, listar e excluir notas com título, conteúdo e data de criação. a listagem vem da mais recente para a mais antiga e os dados persistem no h2.
- rota: `GET /api/health` retorna `{"status":"ok","version":"0.0.1"}`.
- rotas de notas: `GET /api/notes` lista as notas; `POST /api/notes` recebe `{"title":"Título","content":"Conteúdo"}` e retorna a nota criada com status `201`; `DELETE /api/notes/{id}` exclui uma nota e retorna `204`.
- validação: título e conteúdo são obrigatórios e não podem conter apenas espaços (`@NotBlank`); o banco define até 200 caracteres para o título e 10000 para o conteúdo.
- limpeza: `DELETE /api/forensic` apaga todas as notas do banco e retorna `204`. o botão `Apagar tudo` pede confirmação antes de chamar a rota; não há separação por caso ou análise.
- banco: h2 em `backend/data/meratan.mv.db`, usuário `sa`, senha vazia. inicie sempre dentro de `backend/` para usar o mesmo arquivo; os dados não vão para o git.
- migração: flyway executa `backend/src/main/resources/db/migration/V1__create_note.sql` na inicialização e cria a tabela `notes` com `id`, `title`, `content` e `created_at`.
- configuração: `backend/src/main/resources/application.properties`; proxy `/api` em `frontend/vite.config.ts`.
- build: em `frontend/`, execute `npm run build`; em `backend/`, execute `./mvnw verify` para testar e empacotar o backend.
- estado: interface inicial e notas disponíveis, sem autenticação. a aba `File Analysis` ainda está vazia; gestão de casos, evidências, processamento forense, timeline, ia e relatórios ainda não foram implementados.
