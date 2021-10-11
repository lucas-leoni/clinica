# API - Clínica PolyPharmaco

### Para rodar este projeto é necessário ter instalado: 

* [Node.js](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/) - ` npm install -g npm `

### Para verificar se você tem o Node e o NPM instalados execute os seguintes comandos:

* Node - ` node -v `
* NPM - ` npm -v `

### Para instalar as dependências deste projeto execute o seguinte comando:

* ` npm i `

# Documentação da API

> /api/medico

|           ROTA          |     MÉTODO      |         DESCRIÇÃO                    |
| ----------------------- | --------------- | -------------------------------------|
| /api/medicos            |       GET       | listar todos os médicos              |
| /api/medico             |       POST      | adicionar um novo médico             |
| /api/medico/medicoId    |       GET       | visualizar um médico a partir do ID  |
| /api/medico/medicoId    |       PUT       | atualizar um médico a partir do ID   |
| /api/medico/medicoId    |       DELETE    | remover um médico a partir do ID     |


> /api/paciente

|           ROTA            |     MÉTODO      |         DESCRIÇÃO                      |
| ------------------------- | --------------- | -------------------------------------- |
| /api/pacientes            |       GET       | listar todos os pacientes              |
| /api/paciente             |       POST      | adicionar um novo paciente             |
| /api/paciente/pacienteId  |       GET       | visualizar um paciente a partir do ID  |
| /api/paciente/pacienteId  |       PUT       | atualizar um paciente a partir do ID   |
| /api/paciente/pacienteId  |       DELETE    | remover um paciente a partir do ID     |

> /api/medicamento

|           ROTA                  |     MÉTODO      |         DESCRIÇÃO                         |
| ------------------------------- | --------------- | ----------------------------------------- |
| /api/medicamentos               |       GET       | listar todos os medicamentos              |
| /api/medicamento                |       POST      | adicionar um novo medicamento             |
| /api/medicamento/medicamentoId  |       GET       | visualizar um medicamento a partir do ID  |
| /api/medicamento/medicamentoId  |       PUT       | atualizar um medicamento a partir do ID   |
| /api/medicamento/medicamentoId  |       DELETE    | remover um medicamento a partir do ID     |

> /api/farmacia

|           ROTA            |     MÉTODO      |         DESCRIÇÃO                       |
| ------------------------- | --------------- | --------------------------------------- |
| /api/farmacias            |       GET       | listar todas as farmácias               |
| /api/farmacia             |       POST      | adicionar uma nova farmácia             |
| /api/farmacia/farmaciaId  |       GET       | visualizar uma farmácia a partir do ID  |
| /api/farmacia/farmaciaId  |       PUT       | atualizar uma farmácia a partir do ID   |
| /api/farmacia/farmaciaId  |       DELETE    | remover uma farmácia a partir do ID     |
