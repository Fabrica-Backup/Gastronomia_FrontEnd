// Validação SOMA modal
$('.salvar-soma').on('click', function () {
    limpaMensagens();
    var erros = [];
    var qtdSoma = $('.qtdSoma').val();

    if (qtdSoma == '0' || qtdSoma == '' || qtdSoma == null) {
        erros.push('A quantidade a ser somado não ser vazio');
    }
    if (isNaN(qtdSoma)) {
        erros.push('A quantidade deve ser conter NUMERCOS APENAS');
    }
    if (!isNaN(qtdSoma) && qtdSoma != '0' && qtdSoma != '') {
        erros.length = 0;
        postAdd();
    }
    $.each(erros, function (index, erro) {
        var li = $('<li>' + erro + '</li>');
        $(li).appendTo('#mensagens-erro-soma');
    })
});

// Validação SUBTRAIR modal
$('.salvar-subtracao').on('click', function () {
    limpaMensagens();
    var erros = [];
    var qtdSub = $('.qtdSubtrai').val();
    var motivo = $('.motivo').val();

    if (qtdSub == '0' || qtdSub == '') {
        erros.push('A quantidade a subtrair não pode ser vazio');
    }
    if (isNaN(qtdSub)) {
        erros.push('A quantidade deve ser conter NUMERCOS APENAS')
    }
    if (motivo == '') {
        erros.push('Insira o MOTIVO');
    }
    if (qtdSub != '' && qtdSub != '0' && !isNaN(qtdSub) && motivo != '') {
        erros.length = 0;
        postSub();
    }
    $.each(erros, function (index, erro) {
        var li = $('<li>' + erro + '</li>');
        $(li).appendTo('#mensagens-erro-subtrair');
    })
});