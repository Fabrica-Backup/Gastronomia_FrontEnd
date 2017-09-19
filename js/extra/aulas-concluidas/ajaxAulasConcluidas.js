// ========== GET =========== //
// armazena os objetos json de receitas, aulas para ser usado em outros locais
var jsonObjectAula, jsonObjectReceita, jsonPeriodo;

$.getJSON('../js/extra/planejar-aulas/testeJsonAula.js', function (jsonObjectAula) {
    jsonAula = jsonObjectAula;
    $.getJSON('../js/extra/planejar-aulas/testeJsonPeriodo.js', function (jsonObjectPeriodo) {
        jsonPeriodo = jsonObjectPeriodo;

        var btnDetalhes = '<td><button type="button" class="btn btn-xs botaoDetalhes"><i class="fa fa-eye"></i></button></td>'
        var btnExcluir = '<td><button type="button" class="btn btn-danger btn-xs excluir"><i class="fa fa-trash-o"></i></button></td>'

        $.each(jsonObjectAula, function (indexAula, valAula) {
            // conta o numero de receitas na aula
            var countReceitas = Object.keys(valAula.receitas).length;

            // pega apenas as aulas concluidas do json
            if (valAula.aula_concluida == "true") {

                var htmlList = $('<tr class="id-aula" data-id="' + valAula.id_aula + '"></tr>');
                $('<td class="dia_da_aula">' + valAula.data_aula + '</td>').appendTo(htmlList);

                $.each(jsonPeriodo, function (indexPeriodo, valPeriodo) {
                    if (valPeriodo.id_periodo == valAula.periodo_aula) {
                        $('<td class="turno">' + valPeriodo.descricao + '</td>').appendTo(htmlList);
                    }
                })

                $('<td class="num_receitas">' + countReceitas + '</td>').appendTo(htmlList);
                $('<td class="num_alunos">' + valAula.numero_de_alunos_projetados + '</td>').appendTo(htmlList);
                $(btnDetalhes).appendTo(htmlList);
                $(btnExcluir).appendTo(htmlList);

                $(htmlList).appendTo('.aulaConcluidaList');
            }
        })
    })

});

// ========== DELETE =========== //
$('.aulas').on('click', '.excluir', function () {
    var thisTr = $(this).closest('tr');
    var idData = thisTr.data('id');
    swal({
            title: "Tem certeza que deseja deletar esta aula?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Deletar!",
            closeOnConfirm: false,
        },
        function () {
            $.ajax('http://httpbin.org/delete', {
                type: 'DELETE',
                data: {
                    "id_aula": idData
                },
                dataType: 'json',
                success: function () {
                    swal({
                            title: "Aula removido com sucesso!",
                            type: "success",
                        }),
                        $(thisTr).remove();
                },
                error: function () {
                    swal({
                        title: "Problemas ao remover a aula",
                        type: error,
                    })
                },
            })
        }
    );
});

// ========== Ver Detalhes da Aula ========== //
$('.aulas').on('click', '.botaoDetalhes', function () {
    // var nomeReceita é usado para converter id_receita para nome_receita
    var nomeReceita;

    // chama a modal
    $('#verAula').modal('show');

    // pega a id da aula localizado no html
    var idAula = $(this).closest('tr').data('id');

    // limpa as receitas existentes do html
    $('.receitasDetalhes tr').remove();

    // Header da modal
    var dataAula = $(this).closest('tr').find('.dia_da_aula').text();
    var htmlDataAula = '<h4 class="modal-title">Aula do dia ' + dataAula + '</h4>'
    $('.headerDaModal').html(htmlDataAula);

    // verifica se foi dado get das receitas, caso nao tenha dado ele dará get aqui
    if (typeof jsonObjectReceita === 'undefined') {
        $.getJSON('../js/extra/planejar-aulas/testeJsonReceitas.js', function (jsonObjectReceita) {
            jsonReceita = jsonObjectReceita;
            aulaDetalhes()
        });
    } else {
        aulaDetalhes();
    }

    function aulaDetalhes() {
        $.map(jsonAula, function (valAula) {
            // pega a aula especifica
            if (valAula.id_aula == idAula) {
                var trIdAula = '<tr hidden data-id="' + valAula.id_aula + '"></tr>';
                $('.receitasDetalhes').append(trIdAula);

                // roda a lista de receitas da aula
                $.each(valAula.receitas, function (indexAulaReceitas, valueAulaReceitas) {
                    // roda a lista de receitas, caso id_receita das duas tabelas sejam iguais, pega o nome_receita da lsita de receitas
                    $.map(jsonReceita, function (valReceita) {
                        if (valueAulaReceitas.id_receita == valReceita.id_receita) {
                            nomeReceita = valReceita.nome_receita;
                        }
                    })

                    var htmlListReceitas = $('<tr></tr>');

                    // cria as 'td' e insere na 'tr'
                    $('<td class="id_receita"><a href="#" id="hipertextColor">' + nomeReceita + '</a></td>').appendTo(htmlListReceitas);
                    $('<td class="quantidade_receita">' + valueAulaReceitas.quantidade_receita + '</td>').appendTo(htmlListReceitas);
                    // joga na tela
                    $(htmlListReceitas).appendTo('.receitasDetalhes');
                })
            }
        })
        // cria botoes clonar e cancelar no rodape
        var htmlButtonArr = [];
        htmlButtonArr.push('<button type="button" class="btn btn-default clonar">Clonar Aula</button>');
        htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>');
        $('.rodape').html(htmlButtonArr);
    }
})

// ========== CLONAR AULA ========== //
$('#verAula').on('click', '.clonar', function () {
    // xunxo para pegar a id da aula
    var idAula = $(this).closest('.modal-body').find('.receitasDetalhes').find('tr').data('id');
    $.each(jsonAula, function (indexAula, valueAula) {
        if (valueAula.id_aula == idAula) {
            var objClone = new Object();
            objClone.id_aula = '';
            objClone.data_aula = '';
            objClone.periodo_aula = valueAula.periodo_aula;
            objClone.aula_concluida = 'false';
            objClone.aula_agendada = 'false';
            objClone.numero_de_alunos_projetados = valueAula.numero_de_alunos_projetados;
            objClone.receitas = [];

            $.each(valueAula.receitas, function (indexAulaReceitas, valueAulaReceitas) {
                objClone.receitas.push(valueAulaReceitas);
            })
            var objCloneStringfy = JSON.stringify(objClone);
            jsonClone(objCloneStringfy);
        }
    })
})

function jsonClone(objCloneStringfy) {
    swal({
            title: "Clonar esta aula?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Clonar",
            closeOnConfirm: false,
        },
        function () {
            $.ajax('http://httpbin.org/post', {
                type: 'POST',
                data: objCloneStringfy,
                dataType: 'json',
                success: function () {
                    swal({
                        title: 'Aula clonado com sucesso!',
                        text: 'Clone está localizado em Planejar Aulas',
                        type: 'success',
                        confirmButtonText: "Ok",
                    });
                },
                error: function () {
                    swal({
                        title: "Problemas ao clonar aula",
                        type: "warning",
                        confirmButtonText: "Vish Maria",
                        confirmButtonColor: "#DD6B55",
                    })
                },
            })
        }
    );
}