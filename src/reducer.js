export function reducer(state = {}, action) {
    if (action.type == "GET_CHART_DATA") {
        // ? NEED TO DO THIS?
        state = Object.assign({}, state, {
            chartdata: action.chartdata,
            currentsearch: action.currentsearch
        });
    } 

    if (action.type == "GET_TWEETS") {
        state = {
            ...state,
            tweetdata: {
                ...state.tweetdata,
                tweetdata: action.tweetdata
            }
        };
    }
    
    return state;
}
