<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 07: GoFinances Web
</h3>

<blockquote align="center">“Não espere resultados brilhantes se suas metas não forem claras”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafios?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafios?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Nesse desafio, desenvolvi uma parte da aplicação de gestão de transações para a web, a GoFinances, com o objetivo de praticar o que aprendi até agora no React.js junto com TypeScript, utilizando rotas e envio de arquivos por formulário.

Essa será uma aplicação que irá se conectar ao seu backend do [Desafio 06](https://github.com/NavarroGuimaraes/gostack-desafio-6), e exibir as transações criadas e permitir a importação de um arquivo CSV para gerar novos registros no banco de dados. Adiiconalmente também adicionei um botão para adicionar uma nova transação sem depender exclusivamente de um arquivo csv.

### Template da aplicação

Para ajudar nesse desafio, a rocketseat criou para você um modelo do qual utilizei para desenvolver essa aplcação.

O template está disponível na seguinte url: **[Acessar Template](https://github.com/Rocketseat/gostack-template-fundamentos-reactjs)**

Lembre-se de navegar até a pasta criada e abrir no Visual Studio Code, e no workspace ativo, executar o comando `yarn` no seu terminal para instalar todas as dependências.

### Preparando o backend

Antes de tudo, para que o frontend se conecte corretamente ao backend, vá até a pasta onde está o `backend` e execute o comandos `yarn dev:server` para iniciar o serviço node.

também é necessário estar com o banco de dados em execução. Execute `docker start <banco de dados>` no terminal antes executar o backend para que tenha o mesmo funcionando corretamente

### Layout da aplicação

Essa aplicação possui um layout preparado no figma o qual segui para desenvolver tanto as funcionalidades requisitadas, quanto as adicionais que decidi por na aplicação.

O layout pode ser acessado através da página do Figma, no [seguinte link](https://www.figma.com/file/EgOhyj1Inz14dhWGVhRlhr/GoFinances?node-id=1%3A863).

Você precisará uma conta (gratuita) no Figma pra inspecionar o layout e obter detalhes de cores, tamanhos, etc.

### Funcionalidades da aplicação

Agora que você já está com o template clonado e pronto para continuar, vamos as principais funcionalidades da aplicação 

- **`Listar as transações da sua API`**: A página `Dashboard` exibe uma listagem através de uma tabela, com o campo `title`, `value`, `type` e `category` de todas as transações que estão cadastradas na sua API.

- **`Adicionar transações à api`**: WIP: A página `Dashboard` exibe um botão que possibilita a adicição de uma nova transação.

- **`Exibir o balance da sua API`**: A página `Dashboard` exibie o balance que é retornado do seu backend, contendo o total geral, junto ao total de entradas e saídas.

- **`Importar arquivos CSV`**: A sua página `Import`, permite o envio de um arquivo no formato `csv` para o seu backend, que irá fazer a importação das transações para o seu banco de dados. O arquivo csv deve seguir o seguinte [modelo](https://github.com/Rocketseat/bootcamp-gostack-desafios/blob/master/desafio-database-upload/assets/file.csv).

### Específicação dos testes

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Para esse desafio, temos os seguintes testes:

- **`should be able to list the total balance inside the cards`**: Para que esse teste passe, a aplicação permite que seja exibido na sua Dashboard, cards contendo o total de `income`, `outcome` e o total da subtração de `income - outcome` que são retornados pelo balance do seu backend.

* **`should be able to list the transactions`**: Para que esse teste passe, a aplicação permite que sejam listados dentro de uma tabela, toda as transações que são retornadas do seu backend.

- **`should be able to navigate to the import page`**: Para que esse teste passe, a aplicação permite a troca de página através do Header, pelo botão que contém o nome `Importar`.

- **`should be able to upload a file`**: Para que esse teste passe, a aplicação permite que um arquivo seja enviado através do componente de drag-n-drop na página de `import`, e que seja possível exibir o nome do arquivo enviado para o input.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💜 by Rocketseat (e eu ^_^) :wave:
