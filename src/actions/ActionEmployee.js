import API from "./API"

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}
export const fetchAll = () => dispatch => {
    API.Employee().fetchAll()
    .then(response => {
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload: response.data    //passing the data which is retrieved from API
        })
    })
    .catch(err => console.log(err))
}
export const create = (data) => dispatch => {
    API.Employee().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        })
    })
    .catch(err => console.log(err))
}
export const update = (id, data) => dispatch => {
    API.Employee().update(id, data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: response.data
        })
    })
    .catch(err => console.log(err))
}
export const Delete = (id) => dispatch => {
    API.Employee().delete(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
    })
    .catch(err => console.log(err))
}