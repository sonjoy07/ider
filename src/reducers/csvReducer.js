const csvReducersDefaultState = []

export default (state = csvReducersDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CSV':
            return {
                ...state,
                header: action.data
            }
        case 'ADD_CSV_ROWS':
            return {
                ...state,
                rows: action.data
            }
        default:
            return state
    }
}