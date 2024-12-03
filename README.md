
# Desafio Gazin:

## 🔧 Rodando o projeto:

Clone o projeto no repositório a seguir:
```
git clone https://github.com/VictorPz/teste_victor_pizetta.git
```

Navegue até o diretório do projeto, acesse a pasta `backend` e copie todo conteúdo do seguinte arquivo:

```
.env.example
```

Ainda na pasta `backend` crie um novo arquivo chamado:

```
.env
```

Neste arquivo `.env` cole todo conteúdo copiado do `.env.example`

Volte para a pasta raiz onde se encontra o docker compose e rode o seguinte comando no terminal:

```
docker-compose up --build -d
```

### ⚠️ Importante:

 - **Antes** de tentar criar um desenvolvedor, **crie primeiro** um novo nível na página de níveis.
- Ao criar um novo desenvolvedor **informe o nível como id** (número inteiro) como no exemplo abaixo:
- O campo "sexo" somente aceitará os caracteres únicos **M ou F**.

```
  Nome: Marcos Antonio,
  Sexo: M,
  Data de nascimento: 15/08/1995,
  Hobby: Marcenaria,
  Nivel: 1
```
- Atenção: Verifique se todas as migrations ja foram realizadas no container Laravel no docker (backend). Ocorreu algumas vezes dele iniciar antes do banco de dados, impossibilitando de fazer as migrations e por consequência interagir com o front. Neste caso, rode o container do backend novamente e ele fará as migrations como deve.

## 💻 Acesse o host para ver o projeto:

http://localhost:3000

## 📃 Documentações

Para maiores informações da api acesse o swagger abaixo:

- [Swagger API Documentation](https://app.swaggerhub.com/apis-docs/VictorPizetta/Desafio_Gazin/1.0.0#/)

---

Caso haja algum problema durante a execução do projeto fico a disposição para auxiliar.

---

### Obrigado pela oportunidade!
Abraços, Victor Pizetta.