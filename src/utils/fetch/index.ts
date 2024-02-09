import config from "@/config";
import { getAccessToken } from "../access-token";
import { ForbiddenError, UnexpectedError } from "../error";

interface ApiResponse<T> {
    data?: T;
}

const API_URL = config.api.BASE_URL; // Replace with your API base URL

export const api = async <T>(
    endpoint: string,
    options: RequestInit,
    jwt: boolean = false
): Promise<ApiResponse<T>> => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: jwt ? {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`
            } : {
                ...options.headers,
            }
        });
        if (response.ok) {
            const data = await response.json() as T;
            return { data };
        }
        
        if (response.status === 403) {
            // Handle 403 error by refreshing the token
            // const accessToken = await refreshAccessToken();

            throw new ForbiddenError("", 'error');
        }

        throw new UnexpectedError(`Unexpected Issue Occured`, 'error');

    } catch (error) {
        throw error;
    }
};

const refreshAccessToken = async (): Promise<string> => {
    try {
        throw 'Token Expired'
        const refreshTokenResponse = await fetch(`${API_URL}/refreshToken`, {
            method: "POST",
            credentials: "include" // Include cookies in the request
        });
        if (refreshTokenResponse.ok) {
            // If using HTTP-only cookie, the refreshed token should be automatically included in subsequent requests
            return "Refreshed token";
        }
        throw ""; // Return null if refresh token failed
    } catch (error) {
        throw error as string; // Return null if refresh token failed
    }
};
