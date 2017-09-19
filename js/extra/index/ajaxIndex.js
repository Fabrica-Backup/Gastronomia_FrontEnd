// ==================== GET ===================== //
// armazena os objetos json de receitas, aulas, e unidade para ser usado em outros locais
var jsonReceita, jsonAula, jsonPeriodo;

// get da tabela de aulas
$.getJSON('../js/extra/planejar-aulas/testeJsonAula.js', function (jsonObjectAula) {
    jsonAula = jsonObjectAula;

    // get da tabela de receitas
    $.getJSON('../js/extra/planejar-aulas/testeJsonReceitas.js', function (jsonObjectReceita) {
        jsonReceita = jsonObjectReceita;

        // get dos periodos
        $.getJSON('../js/extra/planejar-aulas/testeJsonPeriodo.js', function (jsonObjectPeriodo) {
            jsonPeriodo = jsonObjectPeriodo;

            // geração de botoes
            var botaoExcluir = '<td><button type="button" class="btn btn-xs btn-danger excluir"><i class="fa fa-trash"></i></button></td>';
            var botaoEditar = '<td><button class="btn btn-xs editar" type="button"><i class="fa fa-edit"></i></button></td>';
            var botaoAgendarAula = '<td><button class="botaoAgendarAula" type="button">Agendar Aula</button></td>';
            var botaoAulaConcluida = '<td><button class="botaoAulaConcluida" type="button">Aula Concluida</button></td>';
            var botaoDetalhes = '<td><button type="button" class="btn btn-xs botaoDetalhes"><i class="fa fa-eye"></i></button></td>';

            // roda a lista de aulas
            $.each(jsonObjectAula, function (indexAula, valAula) {

                // conta o numero de receitas na aula
                var countReceitas = Object.keys(valAula.receitas).length;

                // cria a 'tr' de cada aula para ficar em formato de lista
                var htmlList = $('<tr class="id-aula" data-id="' + valAula.id_aula + '"></tr>');

                // cria as 'td' com os valores da aula E joga as 'td' dentro da 'tr' htmlList (<tr><td>  </td></tr>)
                $('<td hidden class="id_aula">' + valAula.id_aula + '</td>').appendTo(htmlList);
                $('<td class="dia_da_aula">' + valAula.data_aula + '</td>').appendTo(htmlList);

                // roda a lista de periodos
                $.each(jsonObjectPeriodo, function (indexPeriodo, valPeriodo) {
                    // compara as id da key 'turno' da taebla aula com a key 'id_periodo' da tabela periodo, se forem iguais pega a 'descricao' da tabela periodo para mostrar na tela
                    if (valAula.periodo_aula == valPeriodo.id_periodo) {
                        $('<td class="periodo">' + valPeriodo.descricao + '</td>').appendTo(htmlList);
                    }
                })

                $('<td class="num_receitas">' + countReceitas + '</td>').appendTo(htmlList);
                $('<td class="num_alunos">' + valAula.numero_de_alunos_projetados + '</td>').appendTo(htmlList);

                // joga os botoes detalhes e excluir dentro da 'tr'
                $(botaoDetalhes).appendTo(htmlList);
                $(botaoExcluir).appendTo(htmlList);

                // se aula_agendada = false, a aula NAO ESTA agendada
                if (valAula.aula_agendada == "false") {
                    $(botaoEditar).appendTo(htmlList);
                    $(botaoAgendarAula).appendTo(htmlList);
                    $(htmlList).appendTo('.listaAulasPlanejadas');
                }
                // se aula_agendada = true, aula ESTA planejada
                if (valAula.aula_agendada == "true" && valAula.aula_concluida == "false") {
                    $(botaoAulaConcluida).appendTo(htmlList);
                    $(htmlList).appendTo('.listaAulasAgendadas');
                }
            })
        })
    })
});

// ==================== Ver Detalhes da Aula ==================== //
$('.aulas').on('click', '.botaoDetalhes', function () {
    // var nomeReceita é usado para converter id_reecita para nome_receita
    var nomeReceita;

    // mostra a modal
    $('#verAula').modal('show');

    // pega a id da aula
    var idAula = $(this).closest('tr').data('id');

    // limpa a tabela das receitas
    $('.receitasQuantidade tr').remove();

    // Header da modal
    $.each(jsonAula, function (indexAula, valAula) {
        if (idAula == valAula.id_aula) {
            var trIdAula = '<tr hidden data-id="' + valAula.id_aula + '"></tr>';
            $('.receitasQuantidade').append(trIdAula);

            var htmlDataAula = '<h4 class="modal-title">Aula do dia ' + valAula.data_aula + '</h4>'
            $('.headerDaModal').html(htmlDataAula);
        }
    })

    // verifica se foi dado get das receitas, caso nao tenha dado ele dará get aqui
    if (typeof jsonReceita === 'undefined') {
        $.getJSON('../js/extra/planejar-aulas/testeJsonReceitas.js', function (jsonObjectReceita) {
            jsonReceita = jsonObjectReceita;
            aulaDetalhe()
        });
    }
    aulaDetalhe()

    function aulaDetalhe() {
        // roda a tabela de aulas
        $.map(jsonAula, function (obj) {
            // pega aula com o id especifico
            if (obj.id_aula == idAula) {
                // roda a tabela de receitas da aula
                $.each(obj.receitas, function (indexAulaReceitas, valueAulaReceitas) {
                    // caso id_receita das duas tabelas sejam iguais, pega o nome_receita
                    $.map(jsonReceita, function (objReceita) {
                        if (valueAulaReceitas.id_receita == objReceita.id_receita) {
                            nomeReceita = objReceita.nome_receita;
                        }
                    })

                    var htmlListReceitas = $('<tr></tr>');
                    $('<td class="id_receita"><a href="#" id="hipertextColor">' + nomeReceita + '</a></td>').appendTo(htmlListReceitas);
                    $('<td class="quantidade_receita">' + valueAulaReceitas.quantidade_receita + '</td>').appendTo(htmlListReceitas);
                    $(htmlListReceitas).appendTo('.receitasQuantidade');
                })
            }
        })
        var htmlButtonArr = [];
        htmlButtonArr.push('<button type="button" class="btn btn-default clonar">Clonar Aula</button>');
        htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>');
        $('.rodape').html(htmlButtonArr);
    }
})