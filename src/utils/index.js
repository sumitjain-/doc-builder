import XLSX from "xlsx";

function parseExcelData(data) {
    const filtered = data.filter(a => Array.isArray(a) && a.length);
    const [headers, ...rows] = filtered;
    return {
        headers,
        rows: rows.map(currentRow => {
            const parsedRow = {};
            headers.forEach((label, colIndex) => {
                parsedRow[label] = currentRow[colIndex];
            });
            return parsedRow;
        })
    };
}

export function acceptExcelData(e) {
    return new Promise((resolve) => {
        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (ev) => {
            /* Parse data */
            const binaryString = ev.target.result;
            const workBook = XLSX.read(binaryString, {type:rABS ? 'binary' : 'array'});
            /* Get first worksheet */
            const workSheetName = workBook.SheetNames[0];
            const ws = workBook.Sheets[workSheetName];
            /* Convert array of arrays */
            const data = parseExcelData(XLSX.utils.sheet_to_json(ws, {header:1}));
            resolve(data);
        }
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });
}
