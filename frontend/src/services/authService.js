import axios from "axios";
import { getAuthConfig } from "../utils/authAxios";
import { USER_API_URL } from "../utils/constants";

export const syncUser = async (firebaseUser) => {

    const config = await getAuthConfig(firebaseUser);

    return axios.post(USER_API_URL,
        {
            name: firebaseUser.displayName
        },
        config
    );
};