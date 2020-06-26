biblioteca
  tsyringe

yarn add tsyringe

Testes garatem que a nossa aplciação continue funcionando independente do número de novas funcionalidades de devs no time.

1. Testes unitários

  Testam funcionalidades especificas da nossa aplicaçao( precisam ser funções puras)

  Função pura: depende da propria aplicação
  JAMAIS faz chamada á uma API, efeito colateral
  Não testar um envio de e-mail.


2. Testes de integraçao
  Testem uma funcionalidade completa, passando por várias camadas da aplicação

  Router-> Controller-> Serviço -> Repositório -

3.  Testes end-to-end

  Teste que sumilam a ação do usuário dentro da nossa aplicação

    1. Cliruqe no input de email
    2. Preencha agmartorres@gmail.com
    3. Clique no input de senha
    4. Preencha 123456
    5. Clique no botão logar
    6. Espero que a página tenha enviado o
    7. usuário para o dashbord

#TDD( Test Driven Development )

  - Quando ele se cadastrar na aplicação ele deve receber um e-mail de boas-vindas


yarn typeorm migration:create -n CreateUserTokens
yarn typeorm migration:run

yarn add nodemailer
yarn add @types/nodemailer

yarn add handlebars

yarn typeorm migration:create -n  AddUserIdToAppointment

yarn typeorm migration:run
