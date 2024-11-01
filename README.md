# **Mão Na Massa - A plataforma**

## **Sobre a Plataforma**

**Mão Na Massa** é uma plataforma desenvolvida para facilitar a conexão entre pessoas que precisam de serviços e profissionais que oferecem essas soluções. Inspirada em plataformas de delivery, nossa proposta é simplificar o processo de contratação, trazendo praticidade e agilidade para quem busca profissionais para diferentes tipos de projetos e tarefas.

Nosso objetivo é promover um ambiente onde o usuário possa encontrar rapidamente o prestador de serviço ideal, seja para uma tarefa do dia a dia ou para projetos de maior complexidade. **Mão Na Massa** foi criado para ser intuitivo e seguro, proporcionando uma experiência de contratação transparente para todos os envolvidos.

## **Objetivos**

- **Conectar Pessoas e Profissionais**: Facilitar a comunicação e o fechamento de negócios entre clientes e prestadores de serviços.
- **Agilidade e Praticidade**: Oferecer um processo simplificado, onde o usuário encontra o profissional certo rapidamente e sem complicações.
- **Transparência e Segurança**: A plataforma garante um ambiente seguro e confiável, com avaliações e contratos que asseguram o cumprimento dos acordos.
- **Acessibilidade**: Usuários podem explorar o catálogo de serviços e profissionais sem necessidade de cadastro, incentivando o uso fácil e direto da plataforma.

## **Funcionalidades**

**Mão Na Massa** oferece uma série de recursos para contratantes e profissionais, que facilitam a interação e o fechamento de negócios. 

### Para Contratantes
- **Postagem de Solicitações**: Contratantes podem publicar demandas especificando suas necessidades e requisitos. 
- **Busca de Profissionais**: Permite encontrar prestadores de serviços por habilidade, localização, avaliações e disponibilidade.
- **Envio de Propostas**: Os contratantes podem enviar propostas diretamente aos profissionais de interesse, facilitando o contato.

### Para Profissionais
- **Criação de Perfil**: Profissionais podem criar um perfil com suas habilidades, portfólio e disponibilidade, destacando-se para os contratantes.
- **Oferta de Serviços**: Além de responder às solicitações, os profissionais podem anunciar serviços diretamente e conectar-se com contratantes de forma proativa.
- **Avaliações e Feedback**: Após a conclusão de um projeto, contratantes e profissionais podem avaliar a experiência, promovendo a transparência e a confiança na plataforma.

### Outros Recursos
- **Sistema de Avaliações**: As avaliações e feedbacks são essenciais para orientar futuras contratações, incentivando a qualidade e o compromisso.
- **Formalização de Contratos**: A plataforma disponibiliza contratos padrão entre contratante e contratado, garantindo maior segurança nas transações.
- **Assinatura e Benefícios**: Planos de assinatura para contratantes e profissionais, oferecendo vantagens exclusivas como visibilidade extra nos anúncios e acesso a comentários detalhados nas avaliações.

#   **Mão Na Massa - O código**

##  **Estrutura do código**

INSERIR AQUI O DETALHAMENTO DA ORGANIZAÇÃO DO PROJETO FINAL, COMO PASTAS E ARQUIVOS

## Sistemas existentes

Dentro desta plataforma, existem uma grande variedade de sistemas que ajudam a deixar o código mais modularizado. Esses sistemas permitem que os desenvolvedores criem funcionalidades de forma independente, promovendo a reutilização de código e facilitando a manutenção. A seguir, apresentamos os principais sistemas que compõem a arquitetura da plataforma:

*   Sistema de cadastro
*   Sistema de login
*   Sistema de busca
*   Sistema de propostas
*   Sistema de projetos
*   Sistema de progresso
*   Sistema de contratos
*   Sistema de avaliações
*   Sistema de assinatura
*   Sistema de pagamento
*   Sistema de notificações
*   Banco de dados

Cada um desses sistemas desempenha um papel fundamental na estrutura geral, permitindo uma integração eficiente e a implementação de novas funcionalidades de maneira ágil. Abaixo, você encontrará uma breve descrição de cada um, destacando suas principais características e contribuições para o projeto.

### Sistema de Cadastro

O sistema de cadastro é responsável por uma das primeiras interações do usuário com o site: **a criação da conta**. Nesta etapa, diferenciamos os usuários em duas categorias: **profissionais** e **contratantes**. Para isso, contamos com uma caixa de seleção, onde o usuário pode escolher a opção que mais se identifica.

Antes de prosseguir, é necessário explicar brevemente cada tipo de usuário. Começando com os **profissionais**, estes são os usuários que serão chamados ou que se oferecerão para realizar um determinado serviço. Por outro lado, os **contratantes** são os usuários que buscarão ou publicarão seu interesse em encontrar alguém para realizar um serviço específico. Dessa forma, fica evidente a necessidade de dividir de forma clara os dois tipos de usuários dentro da plataforma, principalmente para evitar problemas de permissão.

Ao realizar o cadastramento, haverá um formulário específico para cada tipo de usuário, contendo campos que deverão ser preenchidos (ou não, para os itens opcionais) com as seguintes informações:

#### Para os **profissionais**:
- Nome completo ou nome da empresa
- E-mail e telefone de contato
- Área de atuação (ex.: design gráfico, programação, marketing, serviços de saúde)
- Lista de habilidades e competências
- Experiência profissional (com um campo para adicionar projetos ou serviços anteriores)
- Portfólio (links ou arquivos de projetos)
- Foto de perfil (para pessoas físicas) ou logotipo (para empresas)
- Disponibilidade (full-time, part-time, por projeto)
- Opção de adicionar um vídeo de apresentação
- Métodos de pagamento (para facilitar contratos)

#### Para os **contratantes**:
- Nome ou nome da empresa
- E-mail e telefone de contato
- Tipo de contratante (pessoa física ou jurídica)
- Descrição da empresa (opcional)
- Localização (bairro, cidade e país)
- Métodos de pagamento (para facilitar contratos)

### Sistema de Login

O sistema de login permite que os usuários acessem suas contas de forma segura e prática. Após a criação da conta, tanto **profissionais** quanto **contratantes** poderão efetuar o login na plataforma utilizando suas credenciais.

#### Funcionalidades do Sistema de Login:

- **Formulário de Login**: O usuário deve inserir seu e-mail e senha cadastrados para acessar a conta.
  
- **Recuperação de Senha**: Caso o usuário esqueça sua senha, deve haver uma opção de recuperação. O processo normalmente envolve o envio de um e-mail com instruções para redefinir a senha.

- **Autenticação Segura**: Implementação de medidas de segurança, como criptografia de senhas e proteção contra tentativas de acesso não autorizadas.

- **Lembre-me**: Opção para que o usuário permaneça logado em sua conta, evitando a necessidade de inserir as credenciais a cada acesso.

- **Logout**: Função que permite ao usuário encerrar sua sessão de forma segura.

- **Verificação de Autenticação**: O sistema possui uma função responsável por confirmar se o usuário está logado e autenticado. Essa funcionalidade é fundamental para outros sistemas da plataforma, garantindo que apenas usuários autorizados possam acessar recursos e informações sensíveis.

#### Considerações de Segurança:

- **Validação de Credenciais**: O sistema deve validar as credenciais fornecidas antes de permitir o acesso à conta.
  
- **Bloqueio de Conta**: Após um número específico de tentativas de login falhadas, a conta deve ser temporariamente bloqueada para prevenir acessos não autorizados.

- **Autenticação de Dois Fatores** (opcional): Para maior segurança, a implementação da autenticação de dois fatores pode ser considerada, onde o usuário deve confirmar sua identidade através de um segundo método, como um código enviado por SMS ou e-mail.

Este sistema de login é essencial para garantir que apenas usuários autorizados tenham acesso às funcionalidades da plataforma, proporcionando uma experiência segura e confiável.

### Sistema de Busca

Este sistema é responsável pelas buscas realizadas dentro da plataforma. O tipo de busca depende do usuário que está realizando a pesquisa, sendo ele um **profissional** ou um **contratante**. Além disso, a busca pode utilizar diferentes filtros para refinar os resultados.

- **Profissionais** podem buscar apenas por **contratantes**, ajudando-os a encontrar oportunidades de trabalho.
  
- **Contratantes**, por sua vez, podem buscar apenas por **profissionais**, permitindo que encontrem especialistas adequados para seus serviços.

Essa estrutura garante que cada tipo de usuário tenha acesso apenas às informações relevantes, promovendo uma interação mais eficiente e focada dentro da plataforma.

### Sistema de Propostas

O sistema de propostas é responsável por gerenciar as ofertas e solicitações de serviços até que sejam aceitas ou recusadas. Este sistema permite uma interação dinâmica entre **contratantes** e **profissionais**.

#### Funcionalidades para Contratantes:

- **Postar procura por serviços**: O contratante pode publicar na plataforma uma solicitação por serviços, detalhando suas necessidades e requisitos.

- **Fazer um proposta direta**: O contratante tem a opção de enviar uma proposta diretamente para um profissional específico, estabelecendo uma relação mais direta e personalizada.

#### Funcionalidades para Profissionais:

- **Postar oferta de serviço**: O profissional pode publicar na plataforma uma oferta de serviço, apresentando suas habilidades e condições para o trabalho.
  
- **Fazer um oferta direta**: O profissional também pode enviar uma oferta de serviço diretamente para um contratante específico, demonstrando seu interesse em atender à solicitação.

Esse sistema assegura que as interações entre contratantes e profissionais sejam organizadas e eficientes, permitindo que ambos encontrem as melhores oportunidades de trabalho e colaborações.

### Sistema de Projetos

O sistema de projetos é responsável por gerenciar os projetos que já foram aceitos. Ele facilita o acompanhamento e a organização das informações relacionadas a cada projeto, garantindo que todos os detalhes sejam devidamente registrados.

#### Funcionalidades do Sistema de Projetos:

- **Descrição Detalhada do Projeto**: O sistema solicita aos usuários que forneçam uma descrição completa do projeto, incluindo:

  - **Data de Início do Projeto**: A data em que o projeto terá início.
  - **Data de Término do Projeto**: A data prevista para a conclusão do projeto.
  - **Tipo de Serviço Contratado**: Especificação do serviço que foi contratado.
  - **Descrição do Serviço**: Uma explicação detalhada do serviço a ser prestado.
  - **Valor Acordado**: O valor que foi acordado entre as partes para a realização do serviço.

Esse sistema garante que todos os projetos sejam documentados de forma clara e organizada, permitindo um melhor gerenciamento e acompanhamento do progresso.

### Sistema de Progresso

O sistema de progresso é responsável por gerenciar e atualizar o andamento dos projetos ao longo do tempo. Ele fornece uma visão clara sobre o status de cada projeto, facilitando o acompanhamento tanto para contratantes quanto para profissionais. Essa visão é proporcionada por uma interface de status, que apresentará o status atual ou uma barra de progresso dependendo da etapa.

#### Estágios do Sistema de Progresso:

- **Aguardando Fechamento do Contrato**: Nesta fase, o projeto está apenas aguardando a finalização do contrato para saber a data que deverá coomeçar.

- **Aguardando Data de Início**: Assim como a etapa anterior, aqui o projeto ainda não foi iniciado. Aqui ele aguarda a data de início assinada no contrato.

- **Em Andamento**: 

  - Assim que chegar a data que foi acordada como início do projeto, iniciará uma barra de progresso que permitirá ter um:

    - **Retorno Visual do Progresso**: Haverá um barra que se encherá gradualmente conforme o tempo passa, refletindo o progresso do projeto.
    
    - **Retorno por Porcentagem do Progresso**: Uma porcentagem explícita é exibida na página (no meio da barra de progresso), indicando o quanto do projeto foi concluído.

  - O tempo é considerado de forma discreta, utilizando o dia como referência. Portanto, a porcentagem e a barra só serão atualizadas a cada dia que passa.

- **Finalizado**: Indica que o projeto foi concluído, encerrando o acompanhamento de progresso.

Esse sistema proporciona um acompanhamento eficiente do progresso dos projetos, garantindo que todas as partes interessadas estejam cientes do status atual e do tempo restante para a conclusão.


### Sistema de Contratos

O sistema de contratos é responsável pela criação dos contratos e pelo gerenciamento das assinaturas das partes envolvidas. Este sistema utiliza as informações adquiridas pelo sistema de projetos para gerar contratos automaticamente, garantindo agilidade e precisão nas documentações.

#### Funcionalidades do Sistema de Contratos:

- **Geração Automática de Contratos**: Com base nas informações dos projetos, o sistema cria um contrato que inclui os seguintes campos:

  - **Dados do Contratante e do Contratado**: Um campo que será preenchido com as informações de ambas as partes envolvidas.
  - **Especificações do Serviço Acordado**: Um campo que descreve detalhadamente o serviço que foi acordado.
  - **Prazo Acordado**: Um campo que informa o prazo estipulado para a conclusão do serviço.
  - **Valor Acordado**: Um campo que indica o valor que foi acordado para a prestação do serviço.
  
- **Cláusulas Importantes**:

  - **Desresponsabilização da Plataforma**: Uma cláusula que isenta a plataforma de responsabilidade sobre os serviços prestados entre contratante e contratado.
  - **Porcentagem Cobrada pela Plataforma**: Uma cláusula que detalha a porcentagem que será cobrada pela plataforma pelos serviços realizados.

- **Assinaturas das Partes Envolvidas**: Um campo destinado às assinaturas digitais de ambas as partes, formalizando o contrato.

Esse sistema assegura que todos os contratos sejam gerados de forma padronizada e eficiente, garantindo que as obrigações e direitos de cada parte estejam claramente documentados.

### Sistema de avaliações

### Sistema de assinatura

### Sistema de pagamento

### Sistema de notificações

### Banco de dados
