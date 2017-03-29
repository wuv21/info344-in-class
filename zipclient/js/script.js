$(document).ready(function() {
    var baseUrl = "http://localhost:8000/zips/city/"


    $('#city-submit').click(function() {
        var compiledUrl = baseUrl + $('#city-input').val();
        $('#data-return-2').empty();

        fetch(compiledUrl)
            .then(function(resp) {
                return resp.json()
            })
            .then(function(data) {
                data.forEach(function(d) {
                    var row = $('<tr>');
                    
                    row.append($('<td>').text(d.zip));
                    row.append($('<td>').text(d.city));
                    row.append($('<td>').text(d.state));

                    $('#data-return-2').append(row);
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    });
});