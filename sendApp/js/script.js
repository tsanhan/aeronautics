import * as config from './config.js'

((global) => {
    const { addCord } = config;
    $("#aeroForm").validate();
    $("#aeroForm").submit((event) => {
        if ($("#aeroForm").validate().valid()) {
            const name = $('#name').val();
            const x = +$('#x').val();
            const y = +$('#y').val();

            $.post(addCord, { name, x, y })
                .then((rslt) => {
                    alert(`cool!, ${rslt}`);
                })
                .catch(err => {
                    console.warn(err);
                    alert("not so cool!");
                })
                .always(() => {
                    $('#name').val('');
                    $('#x').val('');
                    $('#y').val('');
                });
        }
        return false;
    })

})(window)