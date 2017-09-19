// $.getJSON('../js/extra/nova-receita/testejsonreceita.js', function (result) {
//     jsonObjectReceita = result;
//         alert(result);
// });

$.ajax({
    type: 'GET',
    url: 'http://jsonstub.com/receita/lista',
    contentType: 'application/json',
    beforeSend: function (request) {
        request.setRequestHeader('JsonStub-User-Key', 'a4ed75a2-3733-4107-aacb-68a12165b258');
        request.setRequestHeader('JsonStub-Project-Key', '322cfc5d-3c67-40a3-bb76-d4d40e59d94a');
    }
}).done(function (data) {
    //alert(JSON.stringify(data, null, 4));
    console.log(data);
    $.each(data, function (index, valuel) {
        
        var htmlList = $('<tr class="id-aula" data-id="' + value.id_aula + '"></tr>');
        $('<td class="nome_receita">' + nome_receita + '</td>').appendTo(htmlList);
        $('<td class="classificacao">' + classificacao + '</td>').appendTo(htmlList);
        $('<td class="setor">' + setor + '</td>').appendTo(htmlList);

        
        Show.data;(hmtlList);
        if (value.lista_receita == "false") {
            $(botaoEditar).appendTo(htmlList);
            $(botaoPlanejarAula).appendTo(htmlList);
            $(htmlList).appendTo('.lista_receita');
        }
        if (value.aula_pronta == "true" && value.aula_concluida == "false") {
            $(botaoAulaConcluida).appendTo(htmlList);
            $(htmlList).appendTo('.lista_receita');
        }

        show 
    })
});
