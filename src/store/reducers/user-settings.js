const initState = {
    sheetData: {headers: [], rows: []},
    bgImage: '',
    textFields: [],
};


export default function (state = mock, action) {
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
                    console.log(`key ${newTextField.key} found in list`);
                    console.log(newTextField.x, newTextField.y);
                    updatedTextFields[idxInOldList] = newTextField;
                } else {
                    newFields.push(newTextField);
                }
            });
            return {
                ...state, textFields: [...updatedTextFields, ...newFields],
            };
        default:
            return state;
    }
}
