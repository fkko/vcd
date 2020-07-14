export function reducer(state = {}, action) {
    if (action.type == "GET_CHART_DATA") {
        // ? NEED TO DO THIS?
        state = Object.assign({}, state, {
            chartdata: action.chartdata,
        });
    } 
    
    return state;
}
