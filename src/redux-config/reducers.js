
const initialState = {
    contents : [],
    totalContents : []
}

export default function rootReducer(state = initialState, action) {

    if (action.type === 'Update_Result') {
        return Object.assign({}, state, {
            contents : action.payload,
           
        });
    }
    if (action.type === 'UpdateTotal_Result') {
        return Object.assign({}, state, {
            totalContents : action.payload 
        });
    }

}