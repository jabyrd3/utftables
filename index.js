// todo: this code is an imperative nightmare, I need to rewrite it.
const calcColumns = function(rows) {
    let widths = [],
        widthMatrix = rows.map((keys) => {
            return keys.map(innerval => {
                return innerval.length;
            });
        });
    for (let i = 0; i < widthMatrix[0].length; i++) {
        widthMatrix.forEach(row => {
            // console.log(row);
            if ((widths[i] && widths[i] < row[i]) || !widths[i]) {
                widths[i] = row[i];
            }
        });
    }
    return widths;
};
// ctrl
const utftable = function(collection) {
    var headers = Object.keys(collection[0]);
    var rows = [headers];
    collection.forEach((item) => {
        rows.push(Object.keys(item).map((key) => {
            return item[key];
        }));
    });
    var columnWidths = calcColumns(rows);
    var middlebit = '';
    columnWidths.forEach((item, index) => {
        if (index !== columnWidths.length - 1) {
            middlebit += `${'─'.repeat(item + 2)}┬`;
        } else {
            middlebit += '─'.repeat(item + 2);
        }
    });
    var bar = '┌' + middlebit + '┐';
    console.log(bar);
    // iterate rows, including the header
    rows.forEach((item, index) => {
        var row = '';
        // iterate fields in rows.
        item.forEach((inner, innrdx) => {
            // first and last get thik lines
            if (innrdx === 0 || innrdx === columnWidths.length - 1) {
                var sc = '│';
            } else {
                var sc = '│';
            }
            var totalWidth = columnWidths[innrdx] + 2;
            var padding = Math.floor((totalWidth - inner.length) / 2);
            if (innrdx === 0) {
                row += sc;
            } else {
                row += '│';
            }
            if (columnWidths[innrdx] % 2 !== inner.length % 2) {
                row += ' ';
            }
            row += ' '.repeat(padding) + inner + ' '.repeat(padding);
            if (innrdx === columnWidths.length - 1) {
                row += sc;
            }
        });
        console.log(row);
        // header separator
        if (index === 0) {
            var midBar = '├';
            columnWidths.forEach((item, index) => {
                midBar += '─'.repeat(item + 2);
                if (index !== columnWidths.length - 1) {
                    midBar += '┼';
                } else {
                    midBar += '┤';
                }
            });
            console.log(midBar);
        }
        // enclose after last row
        if (index === rows.length - 1) {
            var bottomBar = '└';
            columnWidths.forEach((item, index) => {

                bottomBar += '─'.repeat(item + 2);
                if (index !== columnWidths.length - 1) {
                    bottomBar += '┴';
                } else {
                    bottomBar += '┘';
                }
            });
            console.log(bottomBar);
        }
    });
};
module.exports = utftable;
