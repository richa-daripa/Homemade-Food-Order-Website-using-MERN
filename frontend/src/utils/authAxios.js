export const getAuthConfig = async (firebaseUser) => {
    
    const token = await firebaseUser.getIdToken();

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};