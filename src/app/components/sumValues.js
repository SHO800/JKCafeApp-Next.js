var tableElem = document.getElementById('session-menues');
var rowElems = tableElem.rows;
var price = 0;
for (i = 1, len = rowElems.length; i < len; i++) {
    price += parseInt(rowElems[i].cells[4].innerText);
}
document.getElementById('sum-value').innerText = `${price}円`;