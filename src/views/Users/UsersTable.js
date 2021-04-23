 import React from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap'

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
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {(users.map((user, index) => (
                    <tr key={index} className="align-self-center">
                        <th>{user.nombre}</th>
                        <td>{user.email}</td>
                        <td>{rolUser(user.rol)}</td>
                        <td>{sucursalUser(user.sucursal)}</td>
                        <td className="row justify-content-center" style={{ width: '200px' }}>
                            <ButtonGroup>
                                {(user.status) ?
                                    (<Button color="link"><i className="ml-4 cui-lock-unlocked text-warning font-2xl" title="Cuenta activa"></i></Button>) :
                                    (<Button color="link"><i className="cui-lock-locked text-warning font-2xl" title="Cuenta desactivada"></i></Button>)}
                                <Button color="link"><i className="cui-wrench font-2xl" title="Modificar"></i></Button>
                                <Button color="link"><i className="cui-trash icons font-2xl text-danger" title="Eliminar usuario"></i></Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
                ))}
            </tbody>
        </Table>
    );
}

export default UsersTable;