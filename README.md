# ProjetoHospital

## Iniciando o projeto

Entrar na pasta do projeto e executar o comando "docker-compose up".

## Endpoints

 O exemplo do Paciente serve também para o Médico e Enfermeiro. Acrescentando apenas o get "CRM" e "Coren" no mesmo modelo do get ID.

### Paciente, Médico e Enfermeiro

#### Retornar dados da collection

Retornar todos dados da collection

- GET - http://<host>:3000/hospital/v1/paciente
  
Retornar dados da collection por id

- GET - http://<host>:3000/hospital/v1/paciente/id/:id
  
#### Inserir dados na collection

- POST - http://<host>:3000/hospital/v1/paciente
  
{
	"id": "1",
	"nome": "testePaciente",
	"cpf": "12345"
}

#### Atualizar dados na collection

- PUT - http://<host>:3000/hospital/v1/paciente
  
{
	"id": "1",
	"nome": "testePaciente",
	"cpf": "123456"
}

#### Deletar dados da collection

- DELETE - http://<host>:3000/hospital/v1/paciente/id/:id

### Leitos

#### Inserir dados na collection

Serve tanto para adicionar o novo leito, quando para adicionar um enfermeiro novo.
Paciente, Medico e Enfermeiro, já tem que existir. Senão retorna error.

- POST - http://<host>:3000/hospital/v1/leito
  
  {
    "id": "1",
    "paciente": {
        "id": "1"
    },
    "medico": {
        "id": "2"
    },
    "enfermeiros": [
        {
            "id": "1"
        },
        {
            "id": "2"
        }
    ]
}

#### Retornar dados da collection

Para pegar todos os leitos

- GET - http://<host>:3000/hospital/v1/leito

Para pegar todos os leitos via "CRM" ou "Coren". Só muda os dois ultimos parâmetros.

- GET - http://<host>:3000/hospital/v1/leito/crm/:crm
