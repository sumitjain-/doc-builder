import XLSX from "xlsx";
import {jsPDF} from 'jspdf';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import {canvasDimensions, defaultTextAttributes} from '../constants';

/* list of supported Excel file types */
export const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) {
    return "." + x;
}).join(",");

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
    return new Promise((resolve, reject) => {
        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (ev) => {
            /* Parse data */
            const binaryString = ev.target.result;
            const workBook = XLSX.read(binaryString, {type: rABS ? 'binary' : 'array'});
            /* Get first worksheet */
            const workSheetName = workBook.SheetNames[0];
            const ws = workBook.Sheets[workSheetName];
            /* Convert array of arrays */
            const data = parseExcelData(XLSX.utils.sheet_to_json(ws, {header: 1}));
            resolve(data);
        }
        if (file) {
            if (rABS) {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        }
    });
}

export function parseImageData(e) {
    return new Promise((resolve, reject) => {
        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
            /* Parse data */
            const data = ev.target.result;
            resolve(data);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    })

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

function textWriterGenerator(doc) {

    return (field) => {
        const font = field.font || 'helvetica';
        const fontSettings = (doc.getFontList() || {[font]: ['']})[font];

        doc.setTextColor(field.color);
        doc.setFontSize(field.size);

        let styleIdx = 0;
        if (field.bold) {
            styleIdx += 1;
        }
        if (field.italic) {
            styleIdx += 2;
        }

        const fontStyle = fontSettings[styleIdx];
        doc.setFont(font, fontStyle);
        doc.text((field.previewText || field.key),
            field.x + pdfConfigs.textOffset[0],
            field.y + pdfConfigs.textOffset[1],
            pdfConfigs.textOptions,
        );
    }
}


export function generateSample(userSettings) {
    const dim = [canvasDimensions.width, canvasDimensions.height];
    const doc = new jsPDF({
        ...pdfConfigs.base,
        format: dim,
    });

    if (userSettings.bgImage) {
        doc.addImage(userSettings.bgImage, 0, 0, dim[0], dim[1]);
    }
    doc.setLineHeightFactor(1);
    const textWriter = textWriterGenerator(doc);
    userSettings.textFields.forEach(textWriter);

    doc.save("doc-builder-sample.pdf")
}

export function generateBundle(userSettings) {
    const dim = [canvasDimensions.width, canvasDimensions.height];

    const primaryKey = userSettings.sheetData.headers[0];

    const zip = new JSZip();

    userSettings.sheetData.rows.forEach(dataRow => {
        const doc = new jsPDF({
            ...pdfConfigs.base,
            format: dim,
        });

        if (userSettings.bgImage) {
            doc.addImage(userSettings.bgImage, 0, 0, dim[0], dim[1]);
        }

        const textWriter = textWriterGenerator(doc);
        userSettings.textFields.forEach(textWriter);

        const filename = `${sanitizeFileName(dataRow[primaryKey])}.pdf`;

        const result = {
            filename, data: doc.output('arraybuffer'),
        };

        zip.file(filename, result.data);
    });

    zip.generateAsync({type: "blob"}).then(function (blob) {
        FileSaver.saveAs(blob, `doc-builder-bundle-${Date.now()}`);
    });

}

export function generateTextField(a, idx) {
    return {
        ...defaultTextAttributes,
        x: 0, y: (idx * defaultTextAttributes.size * 1.25),
        static: false,
        key: a,
    };
}

export function generateNewTextField(textFields, key) {
    let fieldKey = 1;
    const result = {
        ...defaultTextAttributes,
        x: 0, y: (textFields.length * 20),
        static: true,
        key: key || `Static-Text-${fieldKey}`,
    };
    if (!key) {
        while(textFields.find(a => a.key === result.key)) {
            fieldKey += 1;
            result.key = `Static-Text-${fieldKey}`;
        }
    }
    return result;
}
