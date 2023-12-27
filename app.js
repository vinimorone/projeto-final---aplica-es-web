document.addEventListener("DOMContentLoaded", function () {
    const appElement = document.getElementById("lista-empregos");
    const formElement = document.getElementById("jobSearchForm");

    // Função para renderizar as propostas de emprego
    function renderJobProposals(empregos) {
        appElement.innerHTML = ""; // Limpa o conteúdo atual

        empregos.forEach((emprego) => {
            const propostaElement = document.createElement("div");
            propostaElement.classList.add("proposta");

            propostaElement.innerHTML = `
                <div class="cargo">${emprego.cargo}</div>
                <div class="detalhes">${emprego.empresa} | ${emprego.localizacao} | ${emprego.contato}</div>
                <div class="descricao">${emprego.descricao}</div>
            `;

            appElement.appendChild(propostaElement);
        });
    }

    // Fetch data from JSON file
    fetch('jobs-data.json')
        .then(response => response.json())
        .then(data => {
            // Inicializa a renderização com todas as propostas
            renderJobProposals(data.empregos);

            // Adiciona um ouvinte de evento para a barra de pesquisa
            formElement.addEventListener("submit", function (event) {
                event.preventDefault();

                const searchTerm = document.getElementById("searchTerm").value.toLowerCase();

                // Filtra as propostas com base no termo de pesquisa
                const filteredEmpregos = data.empregos.filter((emprego) =>
                    emprego.cargo.toLowerCase().includes(searchTerm) ||
                    emprego.empresa.toLowerCase().includes(searchTerm) ||
                    emprego.localizacao.toLowerCase().includes(searchTerm)
                );

                // Renderiza as propostas filtradas
                renderJobProposals(filteredEmpregos);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
