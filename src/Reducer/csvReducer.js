const initialState = {
    table: []
}

function csvReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TABLE":
            return { table: action.table }
    }
}