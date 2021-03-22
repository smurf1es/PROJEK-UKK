Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

function buildTableBody(data, columns, showHeaders, headers) {
  var body = [];

  if (showHeaders) {
    body.push(headers);
  }

  data.forEach(function (row) {
    var dataRow = [];
    var i = 0;

    columns.forEach(function (column) {
      dataRow.push({
        text: Object.byString(row, column),
        alignment: headers[i].alignmentChild,
      });
      i++;
    });
    body.push(dataRow);
  });

  return body;
}

function table(data, columns, widthsDef, showHeaders, headers, layoutDef) {
  return {
    table: {
      headerRows: 1,
      widths: widthsDef,
      body: buildTableBody(data, columns, showHeaders, headers),
    },
    layout: layoutDef,
  };
}

export { table };
