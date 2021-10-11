const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB = {
  medico: [
    {
      id: 100,
      nome: "Lucas",
      especialidade: "Alergista",
    },
    {
      id: 101,
      nome: "Marcos",
      especialidade: "Ortopedista",
    },
    {
      id: 102,
      nome: "Luciana",
      especialidade: "Pediatra",
    },
  ],
  paciente: [
    {
      id: 100,
      nome: "João",
      exame: {
        tipo: "Hemograma",
        data: "11/10/2021",
        solicitante: "Lucas",
      },
      receita: {
        descricao: "",
        data: "11/10/2021",
        prescritor: "Lucas",
      },
    },
    {
      id: 101,
      nome: "Maria",
      exame: {
        tipo: "Raio-x",
        data: "12/10/2021",
        solicitante: "Marcos",
      },
      receita: {
        descricao: "",
        data: "12/10/2021",
        prescritor: "Marcos",
      },
    },
    {
      id: 102,
      nome: "José",
      exame: {
        tipo: "Hemograma",
        data: "11/10/2021",
        solicitante: "Luciana",
      },
      receita: {
        descricao: "",
        data: "13/10/2021",
        prescritor: "Luciana",
      },
    },
  ],
  medicamento: [
    {
      id: 100,
      nome: "Busonid",
      generico: "Budesonida",
      dosagem: "64mcg",
      posologia: "",
      indicacaoMedicamentosa: "",
    },
    {
      id: 101,
      nome: "Sinvastatina",
      generico: "Sinvasmax",
      dosagem: "20mg",
      posologia: "",
      indicacaoMedicamentosa: "",
    },
    {
      id: 102,
      nome: "Loratadina",
      generico: "Loranil",
      dosagem: "10mg",
      posologia: "",
      indicacaoMedicamentosa: "",
    },
  ],
  farmacia: [
    {
      id: 100,
      nome: "Drogaria Catarinense",
      medico: {
        nome: "Lucas",
        especialidade: "Alergista",
      },
      paciente: { nome: "João" },
    },
    {
      id: 101,
      nome: "Drogaria Nunes",
      medico: {
        nome: "Marcos",
        especialidade: "Ortopedista",
      },
      paciente: { nome: "Maria" },
    },
    {
      id: 102,
      nome: "Droga Raia",
      medico: {
        nome: "Luciana",
        especialidade: "Pediatra",
      },
      paciente: { nome: "José" },
    },
  ],
};

// criando uma rota que retorne todos os médicos
app.get("/api/medicos", (request, response) => {
  response.send(DB.medico);
});

// adicionando um novo médico
app.post("/api/medico", (req, res) => {
  const { nome, especialidade } = req.body;
  DB.medico.push({
    id: Math.floor(Math.random() * 10 + 1),
    nome,
    especialidade,
  });
  res.send({ message: "Uhuul, novo médico adicionado com sucesso!" });
});

// criando uma rota que retorna um médico por id
app.get("/api/medico/:medicoId", (req, res) => {
  const idUser = req.params.medicoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medico = DB.medico.find((index) => index.id === id);
    if (medico !== undefined) {
      res.statusCode = 200;
      res.json(medico);
    } else {
      res.sendStatus(404);
    }
  }
});

// atualizando um médico por id
app.put("/api/medico/:medicoId", (req, res) => {
  const idUser = req.params.medicoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medico = DB.medico.findIndex((index) => index.id === id);
    if (medico === -1) {
      res.sendStatus(404);
    } else {
      const { id, nome, especialidade } = req.body;
      DB.medico.splice(medico, 1, {
        id,
        nome,
        especialidade,
      });
      res.statusCode = 200;
      res.json({ message: "Médico atualizado com sucesso!" });
    }
  }
});

// deletar um médico a partir de um id associado
app.delete("/api/medico/:medicoId", (req, res) => {
  const idUser = req.params.medicoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medico = DB.medico.findIndex((index) => index.id === id);
    if (medico === -1) {
      // usuário informou um id que não existe na base
      res.sendStatus(404);
    } else {
      DB.medico.splice(medico, 1);
      res.statusCode = 200;
      res.json({ message: "Uhull, medico removido com sucesso!" });
    }
  }
});

// criando uma rota que retorne todos os pacientes
app.get("/api/pacientes", (request, response) => {
  response.send(DB.paciente);
});

// adicionando um novo paciente
app.post("/api/paciente", (req, res) => {
  const {
    nome,
    exame = { tipo, data, solicitante },
    receita = { descricao, data, prescritor },
  } = req.body;
  DB.paciente.push({
    id: Math.floor(Math.random() * 10 + 1),
    nome,
    exame,
    receita,
  });
  res.send({ message: "Uhuul, novo paciente adicionado com sucesso!" });
});

// criando uma rota que retorna um paciente por id
app.get("/api/paciente/:pacienteId", (req, res) => {
  const idUser = req.params.pacienteId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const paciente = DB.paciente.find((index) => index.id === id);
    if (paciente !== undefined) {
      res.statusCode = 200;
      res.json(paciente);
    } else {
      res.sendStatus(404);
    }
  }
});

// atualizando um paciente por id
app.put("/api/paciente/:pacienteId", (req, res) => {
  const idUser = req.params.pacienteId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const paciente = DB.paciente.findIndex((index) => index.id === id);
    if (paciente === -1) {
      res.sendStatus(404);
    } else {
      const { id, nome, exame, receita } = req.body;
      DB.paciente.splice(paciente, 1, {
        id,
        nome,
        exame,
        receita,
      });
      res.statusCode = 200;
      res.json({ message: "Paciente atualizado com sucesso!" });
    }
  }
});

// deletar um paciente a partir de um id associado
app.delete("/api/paciente/:pacienteId", (req, res) => {
  const idUser = req.params.pacienteId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const paciente = DB.paciente.findIndex((index) => index.id === id);
    if (paciente === -1) {
      // usuário informou um id que não existe na base
      res.sendStatus(404);
    } else {
      DB.paciente.splice(paciente, 1);
      res.statusCode = 200;
      res.json({ message: "Uhull, paciente removido com sucesso!" });
    }
  }
});

// criando uma rota que retorne todos os medicamentos
app.get("/api/medicamentos", (request, response) => {
  response.send(DB.medicamento);
});

// adicionando um novo medicamento
app.post("/api/medicamento", (req, res) => {
  const { nome, generico, dosagem, posologia, indicacaoMedicamentosa } =
    req.body;
  DB.medicamento.push({
    id: Math.floor(Math.random() * 10 + 1),
    nome,
    generico,
    dosagem,
    posologia,
    indicacaoMedicamentosa,
  });
  res.send({ message: "Uhuul, novo medicamento adicionado com sucesso!" });
});

// criando uma rota que retorna um medicamento por id
app.get("/api/medicamento/:medicamentoId", (req, res) => {
  const idUser = req.params.medicamentoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medicamento = DB.medicamento.find((index) => index.id === id);
    if (medicamento !== undefined) {
      res.statusCode = 200;
      res.json(medicamento);
    } else {
      res.sendStatus(404);
    }
  }
});

// atualizando um medicamento por id
app.put("/api/medicamento/:medicamentoId", (req, res) => {
  const idUser = req.params.medicamentoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medicamento = DB.medicamento.findIndex((index) => index.id === id);
    if (medicamento === -1) {
      res.sendStatus(404);
    } else {
      const { id, nome, generico, dosagem, posologia, indicacaoMedicamentosa } =
        req.body;
      DB.medicamento.splice(medicamento, 1, {
        id,
        nome,
        generico,
        dosagem,
        posologia,
        indicacaoMedicamentosa,
      });
      res.statusCode = 200;
      res.json({ message: "Medicamento atualizado com sucesso!" });
    }
  }
});

// deletar um medicamento a partir de um id associado
app.delete("/api/medicamento/:medicamentoId", (req, res) => {
  const idUser = req.params.medicamentoId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const medicamento = DB.medicamento.findIndex((index) => index.id === id);
    if (medicamento === -1) {
      // usuário informou um id que não existe na base
      res.sendStatus(404);
    } else {
      DB.medicamento.splice(medicamento, 1);
      res.statusCode = 200;
      res.json({ message: "Uhull, medicamento removido com sucesso!" });
    }
  }
});

// criando uma rota que retorne todas as farmácias
app.get("/api/farmacias", (request, response) => {
  response.send(DB.farmacia);
});

// adicionando uma nova farmácia
app.post("/api/farmacia", (req, res) => {
  const { nome, medico = {}, paciente = {} } = req.body;
  DB.farmacia.push({
    id: Math.floor(Math.random() * 10 + 1),
    nome,
    medico,
    paciente,
  });
  res.send({ message: "Uhuul, nova farmácia adicionada com sucesso!" });
});

// criando uma rota que retorna uma farmácia por id
app.get("/api/farmacia/:farmaciaId", (req, res) => {
  const idUser = req.params.farmaciaId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const farmacia = DB.farmacia.find((index) => index.id === id);
    if (farmacia !== undefined) {
      res.statusCode = 200;
      res.json(farmacia);
    } else {
      res.sendStatus(404);
    }
  }
});

// atualizando uma farmácia por id
app.put("/api/farmacia/:farmaciaId", (req, res) => {
  const idUser = req.params.farmaciaId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const farmacia = DB.farmacia.findIndex((index) => index.id === id);
    if (farmacia === -1) {
      res.sendStatus(404);
    } else {
      const { id, nome, medico, paciente } = req.body;
      DB.farmacia.splice(farmacia, 1, {
        id,
        nome,
        medico,
        paciente,
      });
      res.statusCode = 200;
      res.json({ message: "Farmácia atualizada com sucesso!" });
    }
  }
});

// deletar uma farmácia a partir de um id associado
app.delete("/api/farmacia/:farmaciaId", (req, res) => {
  const idUser = req.params.farmaciaId;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const farmacia = DB.farmacia.findIndex((index) => index.id === id);
    if (farmacia === -1) {
      // usuário informou um id que não existe na base
      res.sendStatus(404);
    } else {
      DB.farmacia.splice(farmacia, 1);
      res.statusCode = 200;
      res.json({ message: "Uhull, farmacia removida com sucesso!" });
    }
  }
});

// iniciando o app na porta 3000
app.listen(3000, () => {
  console.log("API RUNNING, http://localhost:3000");
});
