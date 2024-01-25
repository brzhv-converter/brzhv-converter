import { POST } from "./HttpsService";

const PATH = {
    createUser: 'create-user',
    loginUser: 'login-user',
    verifyToken: 'verify-token',
    getUser: 'get-user',
    editUser: 'edit-user',
}

export const createUser = ({
    login,
    email,
    wallet,
    password
}) => (
    POST({
        path: PATH.createUser,
        body: {
            login, email, wallet, password
        }
    })
)

export const loginUser = ({
    email,
    password
}) => (
    POST({
        path: PATH.loginUser,
        body: {
            email, password
        }
    })
)

export const verifyToken = ({
    token
}) => (
    POST({
        path: PATH.verifyToken,
        body: {
            token
        }
    })
)

export const getUser = ({
    id
}) => (
    POST({
        path: PATH.getUser,
        body: {
            id
        }
    })
)

export const editUser = ({
    login,
    email,
    wallet,
    password
}) => (
    POST({
        path: PATH.editUser,
        body: {
            login, email, wallet, password
        }
    })
)