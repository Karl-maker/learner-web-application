export const getAccessTokenFromLocalStorage = () : string | null => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
};

export const removeAccessTokenFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
    location.reload()
};  

export const setAccessTokenInLocalStorage = (accessToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () : string | null => {
    return getAccessTokenFromLocalStorage();
};