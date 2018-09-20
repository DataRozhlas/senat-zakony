//url: 3883

$(function() {
    $.get("data/graf_1.csv", function(data) {
        graph(data, "#graf1");
    });

    $.get("data/graf_2.csv", function(data) {
        graph(data, "#graf2");
    });
});

function graph(file, elem) {
    var tableRows = [];
    var data = process_csv(file);
    var senID = 0;

    if (elem === "#graf1") {
        data["Daniela Filipiová"] = {party: "ODS", district: "Praha 8", laws: {}}
    }

    for (var entry in data) {
        var senator = entry + "<div class='senInfo'>" + data[entry].party + ", " + data[entry].district;
        var infoCell = $("<td>").append(senator);

        var lawCountCell = $("<td>").append("<b>" + ($.isEmptyObject(data[entry].laws) ? 0 : data[entry].laws.length) + "</b>");

        var laws = [];
        for (var law in data[entry].laws) {
            laws.push('<div class="law" id=l' + senID + data[entry].laws[law].url + '>');
        }
        var lawCell = $("<td>").append(laws);
        var tableRow = $("<tr>").append(infoCell, lawCountCell, lawCell);

        tableRows.push(tableRow);
        senID++;
    }

    tableRows.sort(function(a, b){
        var keyA = parseInt($(a).children()[1].innerText);
            keyB = parseInt($(b).children()[1].innerText);

        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
    });

    $(elem).append(tableRows);
    genTooltips(data);
}

function genTooltips(data) {
    var senID = 0;
    for (var entry in data) {
        for (var law in data[entry].laws) {
            var year = parseInt(data[entry].laws[law].date.substring(0,4));
            var month = parseInt(data[entry].laws[law].date.substring(5,7));
            var day = parseInt(data[entry].laws[law].date.substring(8,10));
            var tooltipContent = "<a href='https://www.senat.cz/xqw/xervlet/pssenat/historie?action=detail&value=" + data[entry].laws[law].url + "' target='_blank'>" + data[entry].laws[law].name + "</a>" +
             "<div class='submitted'>Navrženo: " + day + ". " + month + ". " + year + "</div>";

            new Tooltip($("#l"+senID+data[entry].laws[law].url), {
                    placement: 'top',
                    title: tooltipContent,
                    html: true
            });
        }
        senID++;
    }
}

function process_csv(csv) {
    var lines = csv.split("\r\n");
    var data = {};

    lines.forEach(function(line) {
        line = line.split(";");
        if (!data.hasOwnProperty(line[0])) {
            data[line[0]] = {party: line[1], reelect: line[2], district: line[3], laws: []};
        }
        data[line[0]].laws.push({name: line[4], date: line[5], url: line[6]});
    })

    return data
}