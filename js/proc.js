$(function() {
    $.get("https://data.irozhlas.cz/senat-zakony/data/graf_1.csv", function(data) {
        graph(data, "#graf1");
    });

    $.get("https://data.irozhlas.cz/senat-zakony/data/graf_2.csv", function(data) {
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
        var senator = "<div class='senBox'>" + entry + "</div><div class='senInfo'>" + data[entry].party + ", " + data[entry].district + "</div>";
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
            var elemID = "#l"+senID+data[entry].laws[law].url;
            var tooltipContent = "<a href='https://www.senat.cz/xqw/xervlet/pssenat/historie?action=detail&value=" + data[entry].laws[law].url + "' target='_blank'>" + data[entry].laws[law].name + "</a>" +
             "<br><span class='submitted'>Navrženo: " + day + ". " + month + ". " + year + "</span>";

            var tooltipdiv = $("<div>").html(tooltipContent).addClass("tooltip").css("display", "none");
            $(elemID).append(tooltipdiv).hover(function(){
                var tooltip = $(this).children();
                var target = $(this);

                var init_tooltip = function()
                {   
                    tooltip.css( 'max-width', 320 );
                
                    var pos_left = target.position().left,
                        pos_top  = target.position().top + 10;
                    

                    if( pos_left + tooltip.outerWidth() > $( window ).width() )
                    {   
                        pos_left = target.position().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                    }
                    
                    tooltip.css( { left: pos_left, top: pos_top } )
                };
                
                init_tooltip();
                $( window ).resize( init_tooltip );

                tooltip.css("display","initial");
            }, function() {
                $(this).children().css("display","none");
            });

        }
        senID++;
    }
}

function process_csv(csv) {
    var lines = csv.split("\n");
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