const getTokenFromLocalStorage = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;



export const config = {
    headers: {
        Authorization: getTokenFromLocalStorage
            ? `Bearer ${getTokenFromLocalStorage}`
            : null,
        Accept: "application/json",
        'Content-Type': 'application/json'
    },

};

