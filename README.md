## Usuario e senha
{
    "email":"cliente1@example.com",
    "password":"senha123"
}

## Tecnologias Utilizadas

* **Frontend:** Angular
* **Backend:** Node.js com TypeScript
* **Banco de Dados:** MongoDB
* **Mensageria/Filas/Estoque:** RabbitMQ
* **Orquestração de Contêineres:** Docker Compose

## Pré-requisitos

Para rodar esta aplicação, você precisa ter o Docker e o Docker Compose instalados no seu sistema.

* **Docker Desktop:** (Para Windows e macOS, já inclui o Docker Engine e o Docker Compose)
    [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
* **Docker Engine e Docker Compose Plugin:** (Para Linux)
    [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
    [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Como Rodar a Aplicação

Siga estes passos simples para subir todos os serviços usando Docker Compose:

1.  **Baixe o Projeto:** Obtenha os arquivos deste projeto (clonando um repositório Git, baixando um ZIP, etc.).
2.  **Abra o Terminal:** Navegue até a pasta raiz do projeto no seu Terminal ou Prompt de Comando (a pasta que contém o arquivo `docker-compose.yml`).
3.  **Inicie os Serviços:** Execute o seguinte comando para construir as imagens Docker e iniciar todos os contêineres em segundo plano:

    ```bash
    docker compose up --build -d
    ```

    * `--build`: Constrói as imagens Docker para o frontend e backend (necessário na primeira vez e sempre que houver mudanças nos arquivos `Dockerfile` ou no código fonte).
    * `-d`: Executa os contêineres em modo "detached" (em segundo plano).

    Aguarde alguns instantes enquanto o Docker baixa as imagens base, constrói as imagens personalizadas e inicia os serviços (MongoDB, RabbitMQ, Backend, Frontend). A primeira vez pode levar mais tempo.

4.  **Verifique o Status (Opcional):** Você pode verificar o status dos contêineres rodando:
    ```bash
    docker compose ps
    ```

## Acessando a Aplicação e Serviços

Após os serviços iniciarem (especialmente o `backend` e `front`), você pode acessar a aplicação:

* **Frontend (Aplicação Angular):**
    Acesse no seu navegador: [http://localhost:8000](http://localhost:8000)
    *(A porta pode variar se você a modificou no `docker-compose.yml`)*

* **Interface de Gerenciamento do RabbitMQ:**
    Acesse no seu navegador: [http://localhost:15672](http://localhost:15672)
    * **Usuário Padrão:** `user` (Definido no docker-compose.yml)
    * **Senha Padrão:** `password` (Definido no docker-compose.yml)

* **Backend (API Node.js):**
    A API está rodando internamente no contêiner `server` na porta 3000 e está mapeada para `localhost:3000` no seu host. No entanto, a aplicação Frontend se comunica com ela via o proxy Nginx, não diretamente por esta porta externa.

## Parando a Aplicação

Para parar e remover todos os contêineres, redes e volumes (se usados) criados pelo Docker Compose, execute o seguinte comando na pasta raiz do projeto:

```bash
docker compose down
```
## Postman
Há um arquivo de teste com o Postman basta importá-lo
