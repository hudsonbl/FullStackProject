// fetchRequest.js
export const sendGET = (url, dispatch, userInfo, initData) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.bearerToken}`,
            'accept': 'application/json'
        }
    };

    fetch(`${url}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Stores new local data.
            if(data.successStatus){
                // Initialize data in Redux
                dispatch(initData(data[Object.keys(data)[0]]));
            }
        })
        .catch(error => {
            console.log(error)
        });  
}

export const sendPOST = (body, url, dispatch, userInfo, addData, setRequestStatus) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.bearerToken}`,
            'accept': 'application/json'},
        body: JSON.stringify(body)
    };

    fetch(`${url}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Stores new local data.
            if(data.successStatus){
                // Initialize data in Redux
                body[Object.keys(data)[0]] = data[Object.keys(data)[0]]
                dispatch(addData(body));
                setRequestStatus(true)
            }
        })
        .catch(error => {
            console.log(error)
        });  
}

export const sendDELETE = (url, dispatch, orderId, userInfo, deleteData) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.bearerToken}`,
            'accept': 'application/json'},
    };

    fetch(`${url}/${orderId}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Stores new local data.
            if(data.successStatus){
                // Initialize data in Redux
                dispatch(deleteData(orderId));
                
            }
        })
        .catch(error => {
            console.log(error)
        });  
}

export const sendEDIT = (body, url, dispatch, userInfo, editData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.bearerToken}`,
            'accept': 'application/json'},
        body: JSON.stringify(body)
    };

    fetch(`${url}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Stores new local data.
            if(data.successStatus){
                // Initialize data in Redux
                dispatch(editData(body));
            }
        })
        .catch(error => {
            console.log(error)
        });  
}