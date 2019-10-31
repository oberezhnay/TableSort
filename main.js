let table = $(`<table>`);
let tableBody = $(`<tbody>`);

$.each(data[0], function (key, value) {
    if (typeof value !== 'object') {
        th = $(`<th>`);
        th.append(`<th>${key}</th>`).css({
            'border': '1px solid black',
            'background-color': 'rgba(0,0,0, 0.1)'
        });
    }
    table.append(th);
});

$('body').append(table);
$.each(data, function (key, elem) {
    tr = $(`<tr>`);
    $.each(elem, function (index, value) {
        if (typeof value !== 'object') {
            td = $(`<td>${value}</td>`).css('border', '1px solid black')
            tr.append(td);
        }
    });
    tableBody.append(tr);
    table.append(tableBody);
});
$('body').append(table);

/*****sortirovka****/
$('th').click(function () {
    let rows = table.find('tr').toArray().sort(sortRows($(this).index()))
    this.asc = !this.asc
    if (!this.asc) {
        rows = rows.reverse()
    }
    for (let i = 0; i < rows.length; i += 1) {
        table.append(rows[i])
    }
})

function sortRows(index) {

    return function (a, b) {
        let userA = $(a).children('td').eq(index).text()
        let userB = $(b).children('td').eq(index).text()
        return $.isNumeric(userA) && $.isNumeric(userB) ? userA - userB : userA.toString().localeCompare(userB)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.back').addEventListener('click', function () {
        history.back()
    });
    document.querySelector('.go').addEventListener('click', function () {
        history.go(1)
    });
});

document.addEventListener('click', function (event) {
    if (event.target.tagName == 'TH') {
        history.pushState({}, 'title', `sortBy=${event.target.textContent}`);
    }
});