import XLSX from "xlsx";
import {jsPDF} from 'jspdf';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

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

const pdfConfigs = {
    base: {orientation: "l", unit: "px"},
    textOptions: {
        baseline: 'top',
    },
    textOffset: [0, 7],
}

function sanitizeFileName(f) {
    return f.replace(' ', '-');
}

export function generateSample(userSettings) {
    const boundingRect = document.querySelector('.preview-box').getBoundingClientRect();
    const dim = [boundingRect.width, boundingRect.height];
    const doc = new jsPDF({
        ...pdfConfigs.base,
        format: dim,
    });

    doc.addImage(userSettings.bgImage, 0, 0, dim[0], dim[1]);

    userSettings.textFields.forEach(field => {
        doc.text((field.previewText || field.key),
            field.x + pdfConfigs.textOffset[0],
            field.y + pdfConfigs.textOffset[1], pdfConfigs.textOptions);
    });

    doc.save("doc-builder-sample.pdf")
}

export function generateBundle(userSettings) {
    const boundingRect = document.querySelector('.preview-box').getBoundingClientRect();
    const dim = [boundingRect.width, boundingRect.height];

    const primaryKey = userSettings.sheetData.headers[0];

    const zip = new JSZip();

    userSettings.sheetData.rows.forEach(dataRow => {
        const doc = new jsPDF({
            ...pdfConfigs.base,
            format: dim,
        });

        doc.addImage(userSettings.bgImage, 0, 0, dim[0], dim[1]);

        userSettings.textFields.forEach(field => {
            doc.text(dataRow[field.key],
                field.x + pdfConfigs.textOffset[0],
                field.y + pdfConfigs.textOffset[1], pdfConfigs.textOptions);
        });

        const filename = `${sanitizeFileName(dataRow[primaryKey])}.pdf`;

        const result = {
            filename, data: doc.output('arraybuffer'),
        };

        zip.file(filename, result.data);
    });

    zip.generateAsync({type:"blob"}).then(function (blob) {
        FileSaver.saveAs(blob, `doc-builder-bundle-${Date.now()}`);
    });

}
