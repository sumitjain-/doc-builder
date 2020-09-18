export default function(state={
    sheetData: {headers: [], rows: []},
}, action) {
    switch (action.type) {
        case 'SET_SHEET_DATA':
            return {sheetData: action.payload};
        default:
            return state;
    }
}
