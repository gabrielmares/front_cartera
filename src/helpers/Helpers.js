import axiosClient from '../helpers/axiosClient';

export function Inputdate(fecnac) {
    // eslint-disable-next-line
    let arr = new String(fecnac);
    arr = Array.from(arr);
    arr.splice(4, 0, "-");
    arr.splice(7, 0, "-");
    let FecNacioParse = arr.join("");
    return FecNacioParse;
}



/*FUNCION QUE TOMA LA FECHA PROVENIENTE DE NACIMIENTO DE LA BASE DE DATOS Y LA FORMATEA "DD/MM/AAAA" PARA LA VISTA DE LA TABLA INGRESOS */
export function ParseDate(fecnac) {
    // eslint-disable-next-line
    let arr = new String(fecnac);
    arr = Array.from(arr);
    let yearI = arr.slice(0, 4);
    let MonthI = arr.slice(4, 6);
    let dayI = arr.slice(6, 8);
    // return FecNacioParse;
    return (dayI.join("") + "/" + MonthI.join("") + "/" + yearI.join(""))

}

// FUNCION QUE MODIFICA LA FECHA QUE INSERTAN DESDE LOS INPUT DATE
//LA CONVIERTE A FORMATO YYYY-MM-DD, PARA REALIZAR LAS CONSULTAS A LA BD
export function CambiarFecha(FechaDeEntrada) {
    let FechaRegistrada = FechaDeEntrada;
    let formatter = new Intl.DateTimeFormat('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    });
    let NuevaFecha = formatter.formatToParts(FechaRegistrada);
    let NuevaFechaParse = NuevaFecha[6].value + "-" + NuevaFecha[4]["value"] + "-" + NuevaFecha[2]["value"];
    return NuevaFechaParse;
}

export function sumaFechas(fecha, dias) {
    fecha.setDate(fecha.getUTCDate() + dias)
    return fecha
}


export const updateUser = (info) => {
    if (!info.email) return false;
    axiosClient.put('/update', info.email)
        .then((user) => {
            console.log(user);
        })
}

export const deleteUser = (email) => {
    if (!email) return false;
    axiosClient.delete('/delete', email)
        .then((user) => {
            console.log(user);
        })
}

export const disable = (email) => {
    if (!email) return false;
    axiosClient.put('/denied', email)
        .then((user) => {
            console.log(user);
        })
}

export const logOut = () => {
    axiosClient.get('/logout');
}