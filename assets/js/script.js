document.addEventListener("DOMContentLoaded", function () {
    // Lista de médicos disponíveis por especialidade
    const medicosPorEspecialidade = {
        "Cardiologista": ["Doutor Severino"],
        "Oftalmologista": ["Doutor Arnaldo"],
        "Endocrinologista": ["Doutor Marlindo"],
        "Pediatra": ["Doutora Camila", "Doutor João"],
        "Clínico Geral": ["Doutor Carlos", "Doutora Fernanda"],
        "Ortopedista": ["Doutor Ricardo"],
        "Psiquiatra": ["Doutora Mariana"]
    };

    // Referências aos elementos do formulário
    const especialidadeSelect = document.getElementById("especialidade");
    const medicoSelect = document.getElementById("Médico");
    const agendamentoForm = document.getElementById("agendamento-form");
    const agendamentosDiv = document.getElementById("agendamentos");

    // Atualiza a lista de médicos quando a especialidade muda
    especialidadeSelect.addEventListener("change", function () {
        const especialidadeSelecionada = especialidadeSelect.value;
        medicoSelect.innerHTML = ""; // Limpa os médicos anteriores

        if (medicosPorEspecialidade[especialidadeSelecionada]) {
            medicosPorEspecialidade[especialidadeSelecionada].forEach(medico => {
                const option = document.createElement("option");
                option.value = medico;
                option.textContent = medico;
                medicoSelect.appendChild(option);
            });
        }
    });

    // Evento de envio do formulário
    agendamentoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Captura os dados do formulário
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("data_nascimento").value;
        const especialidade = especialidadeSelect.value;
        const exame = document.getElementById("exame").value || "Nenhum";
        const horario = document.getElementById("horario").value;
        const pagamento = document.getElementById("pagamento").value;
        const planoSaude = document.getElementById("plano_saude").value || "Não informado";
        const medico = medicoSelect.value;
        const dataHoraAtual = new Date().toLocaleString("pt-BR");

        // Criação da mensagem de confirmação
        const mensagemConfirmacao = `
        Confirme seu agendamento:
        ---------------------------------
        Nome: ${nome}
        Data de Nascimento: ${dataNascimento}
        Especialidade: ${especialidade}
        Médico: ${medico}
        Exame: ${exame}
        Horário: ${horario}
        Pagamento: ${pagamento}
        Plano de Saúde: ${planoSaude}
        Data e Hora do Agendamento: ${dataHoraAtual}
        ---------------------------------
        Deseja confirmar este agendamento?
        `;

        // Exibir confirmação
        if (confirm(mensagemConfirmacao)) {
            // Criar e adicionar o agendamento na lista
            const novoAgendamento = document.createElement("p");
            novoAgendamento.textContent = `✅ Agendamento confirmado para ${nome} com ${medico} às ${horario}.`;
            agendamentosDiv.appendChild(novoAgendamento);

            // Resetar formulário após agendamento
            agendamentoForm.reset();
        }
    });
});
