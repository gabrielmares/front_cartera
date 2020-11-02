import React from 'react';
import { Table } from 'reactstrap'

const UsersTable = ({ users }) => {
    const rolUser = (rol) => {
        let rolUsuario;
        switch (rol) {
            case 1:
                rolUsuario = 'Administrador'
                break;
            case 2:
                rolUsuario = 'Oficial de Cumplimiento'
                break;
            case 3:
                rolUsuario = 'Gerente'
                break;
            case 4:
                rolUsuario = 'Coordinador'
                break;
            case 5:
                rolUsuario = 'Capturista'
                break;
            case 6:
                rolUsuario = 'Promotor'
                break;
            case 7:
                rolUsuario = 'Archivo'
                break;
            default:
                break;
        }
        return rolUsuario;
    }

    const sucursalUser = (sucursal) => {
        let nombreSucursal;
        switch (sucursal) {
            case 0:
                nombreSucursal = 'No asignada'
                break;
            case 1:
                nombreSucursal = 'Obregon'
                break;
            case 2:
                nombreSucursal = 'Huatabampo'
                break;
            case 3:
                nombreSucursal = 'Navojoa'
                break;

            default:
                break;
        }
        return nombreSucursal
    }


    return (
        <Table responsive hover>
            <thead className="text-center">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Sucursal</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {(users.map((user, index) => (
                    <tr key={index}>
                        <th>{user.nombre}</th>
                        <td>{user.email}</td>
                        <td>{rolUser(user.rol)}</td>
                        <td>{sucursalUser(user.sucursal)}</td>
                    </tr>
                )
                ))}
            </tbody>
        </Table>
    );
}

export default UsersTable;