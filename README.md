# Solução e decisões importantes

Aplicação para criação de notas do usuário e que podem ser compartilhadas com outros usuários da plataforma
Construída com as bibliotecas recomendadas com algumas outras que foram adicionadasconforme a necessidade do desafio.
Para o editor de texto html foi importante decidir quais funções ele deveria ter, pois a biblioteca do editor possui
várias funções de texto, imagem e vídeo. Adicionei somente o que considerei importante para as notas de usuário inicialmente.

# Como executar a aplicação localmente

1. Clone o repositório
2. Rode o comando `npm install` para instalar as dependências
3. Copie o arquivo `.env.example` para `.env` e preencha com as informações do seu ambiente
4. Rode o comando `docker-compose up -d` para subir o banco de dados em um container
5. Rode o comando `npx prisma migrate dev` para executar as migrations do banco de dados
6. Rode o comando `npm run dev` para executar a aplicação
