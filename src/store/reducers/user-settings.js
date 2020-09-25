import {jsPDF} from "jspdf";

const mock = {
    "sheetData": {
        "headers": [
            "Name",
            "Designation"
        ],
        "rows": [
            {
                "Name": "Sumit Jain",
                "Designation": "Son"
            },
            {
                "Name": "Sunil Jain",
                "Designation": "Dad"
            },
            {
                "Name": "Siddharth Jain",
                "Designation": "Son"
            },
            {
                "Name": "Richa Jain",
                "Designation": "Mom"
            }
        ]
    },
    "bgImage": "",
    "textFields": [
        {
            "x": 0,
            "y": 0,
            "static": false,
            "key": "Name",
            "size": 14,
            "color": "#000000",
        },
        {
            "x": 0,
            "y": 20,
            "static": false,
            "key": "Designation",
            "size": 14,
            "color": "#000000",
        }
    ],
    canvasDimensions: {width: 891, height: 630},
};

const initState = {
    sheetData: {headers: [], rows: []},
    bgImage: '',
    textFields: [],
    canvasDimensions: {width: 891, height: 630},
};

const fontList = (new jsPDF()).getFontList();
mock.fontList = fontList;
initState.fontList = fontList;

export default function (state = (initState), action) {
    switch (action.type) {
        case 'SET_SHEET_DATA':
            return {...state, sheetData: action.payload};
        case 'SET_BG_DATA':
            return {...state, bgImage: action.payload};
        case 'SET_TEXT_FIELDS':
            const updatedTextFields = [...state.textFields];
            const newFields = [];
            action.payload.forEach(newTextField => {
                const idxInOldList = updatedTextFields.findIndex(a => (a.key === newTextField.key));
                if (idxInOldList >= 0) {
                    updatedTextFields[idxInOldList] = newTextField;
                } else {
                    newFields.push(newTextField);
                }
            });
            return {
                ...state, textFields: [...updatedTextFields, ...newFields],
            };
        case 'REMOVE_TEXT_FIELD':
            const updatedTextFields2 = state.textFields.filter(a => a.key !== action.payload);
            return {
                ...state, textFields: updatedTextFields2,
            };
        case 'RESET_BG_IMAGE':
            return {...state, bgImage: ''};
        case 'RESET_SHEET_DATA':
            return {...state, sheetData: {headers: [], rows: []}, textFields: []};
        default:
            return state;
    }
}
