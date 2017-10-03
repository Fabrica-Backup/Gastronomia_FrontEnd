function validaUnidadeSoma(valueUnidade) {
    if (valueUnidade == '1') {
        $("#UnidadeMedidaSoma option[value='2']").remove();
        $("#UnidadeMedidaSoma option[value='3']").remove();
        $("#UnidadeMedidaSoma option[value='91']").remove();
        $("#UnidadeMedidaSoma option[value='92']").remove();
    }

    if (valueUnidade == '2') {
        $("#UnidadeMedidaSoma option[value='1']").remove();
        $("#UnidadeMedidaSoma option[value='3']").remove();
        $("#UnidadeMedidaSoma option[value='92']").remove();
    }

    if (valueUnidade == '3') {
        $("#UnidadeMedidaSoma option[value='1']").remove();
        $("#UnidadeMedidaSoma option[value='2']").remove();
        $("#UnidadeMedidaSoma option[value='91']").remove();
    }
}

function validaUnidade(valueUnidade) {
    if (valueUnidade == '1') {
        $("#unidadeMedida option[value='2']").remove();
        $("#unidadeMedida option[value='3']").remove();
        $("#unidadeMedida option[value='91']").remove();
        $("#unidadeMedida option[value='92']").remove();
    }

    if (valueUnidade == '2') {
        $("#unidadeMedida option[value='1']").remove();
        $("#unidadeMedida option[value='3']").remove();
        $("#unidadeMedida option[value='92']").remove();
    }

    if (valueUnidade == '3') {
        $("#unidadeMedida option[value='1']").remove();
        $("#unidadeMedida option[value='2']").remove();
        $("#unidadeMedida option[value='91']").remove();
    }
}

function validaUnidadeSubtrai(valueUnidade) {
    if (valueUnidade == '1') {
        $("#unidadeMedidaSubtrai option[value='2']").remove();
        $("#unidadeMedidaSubtrai option[value='3']").remove();
        $("#unidadeMedidaSubtrai option[value='91']").remove();
        $("#unidadeMedidaSubtrai option[value='92']").remove();
    }

    if (valueUnidade == '2') {
        $("#unidadeMedidaSubtrai option[value='1']").remove();
        $("#unidadeMedidaSubtrai option[value='3']").remove();
        $("#unidadeMedidaSubtrai option[value='92']").remove();
    }

    if (valueUnidade == '3') {
        $("#unidadeMedidaSubtrai option[value='1']").remove();
        $("#unidadeMedidaSubtrai option[value='2']").remove();
        $("#unidadeMedidaSubtrai option[value='91']").remove();
    }
}