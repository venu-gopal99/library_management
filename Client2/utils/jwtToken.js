const getTokenFromLocalStorage = localStorage.getItem("user-token")
    ? localStorage.getItem("user-token")
    : null;
export const config = {
    headers: {
        Authorization: getTokenFromLocalStorage
            ? `Bearer ${getTokenFromLoacalStorage}`
            : null,
        Accept: "application/json",
        'Content-Type': 'application/json'
    },

};

