import axiosClient from "./axiosClient";

// funcion para iniciar sesion, envia los datos al backend para firmar el token
export const LoginFn = async (email, password) => {
    if (email.trim() === "" || password.trim() === "") {
        return alert("Todos los campos son obligatorios");
    }
    let login = await axiosClient.post("/api/signin", { email, password });
    if (login.data.codigo === 500) return login.data.codigo
    if (login.data.codigo === 501) return login.data.codigo
    if (login.data.info) {
        let { data: { user } } = login
        return user;
    }
}