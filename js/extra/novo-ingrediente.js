var botaoAdicionarIngrediente = document.querySelector("#adicionar-ingrediente");
botaoAdicionarIngrediente.addEventListener("click", function(event) {
    event.preventDefault();

    var formIngrediente = document.querySelector("#form-addIngrediente");
    var ingrediente = obtemDadosNovoIngrediente(formIngrediente)
    var ingredienteTr = montaNovoIngrediente(ingrediente);

    var erros = validaIngrediente(ingrediente);
    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    // JOGA NA TABELA DA VIEW OS DADOS SELECIONADOS
    var tabela = document.querySelector(".tabela-ingrediente");
    tabela.appendChild(ingredienteTr);
});

// CAPTURA OS DADOS DO FORMULARIO
function obtemDadosNovoIngrediente(formAdicionarNovoIngrediente) {
    var nomeIngrediente = document.getElementById("nomeIngrediente");

    // BOTAO EXCLUIR A SER GERADO
    var botaoExcluir = document.createElement('input');
    botaoExcluir.setAttribute('type', 'button');
    botaoExcluir.setAttribute('value', 'Excluir');
    botaoExcluir.setAttribute('class', 'excluir');

    var ingrediente = {
            nome: document.getElementById("nome").value,
            calorias: document.getElementById("calorias").value,
            aproveitamento: document.querySelector("#aproveitamento").value,
            necessario: "0",
            faltante: "0",
            unidade: unidade.options[unidade.selectedIndex].value,
            excluir: botaoExcluir.value
        }
        // document.body.appendChild(botaoExcluir);
    return ingrediente;
}

// GERA OS DADOS DO FORMULARIO NA TABELA
function montaNovoIngrediente(ingrediente) {

    var ingredienteTr = document.createElement("tr");
    ingredienteTr.classList.add("ingredienteAdicionado");

    ingredienteTr.appendChild(montaTd(ingrediente.nome, "info-nome"));
    ingredienteTr.appendChild(montaTd(ingrediente.calorias, "info-calorias"));
    ingredienteTr.appendChild(montaTd(ingrediente.aproveitamento, "info-aproveitamento"));
    ingredienteTr.appendChild(montaTd(ingrediente.necessario, "info-necessario"));
    ingredienteTr.appendChild(montaTd(ingrediente.faltante, "cor-coluna-falta"));
    ingredienteTr.appendChild(montaTd(ingrediente.unidade, "info-unidade"));
    ingredienteTr.appendChild(montaTd(ingrediente.excluir, "botao-excluir"));

    return ingredienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

// VALIDAÇAO DO INGREDIENTE
function validaIngrediente(ingrediente) {
    var erros = [];

    if (ingrediente.nome.length == 0) {
        erros.push("O NOME do ingrediente não pode estar em branco");
    }
    if (ingrediente.calorias.length == 0) {
        erros.push("A calorias CALORICA não pode estar em branco");
    }
    if (ingrediente.aproveitamento.length == 0) {
        erros.push("O APROVEITAMENTO não pode estar em branco");
    }
    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}