const getTokenFromLoacalStorage = localStorage.getItem("user-token")
    ? localStorage.getItem("user-token")
    : null;
    console.log(getTokenFromLoacalStorage , "venugopal")
export const config = {
    headers: {
        Authorization: getTokenFromLoacalStorage
            ? `Bearer ${getTokenFromLoacalStorage}`
            : null,
        Accept: "application/json",
        'Content-Type': 'application/json'
    },
};

