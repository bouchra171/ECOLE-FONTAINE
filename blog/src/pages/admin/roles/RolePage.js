
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; 
import { AdminContext } from '../../../utils/adminContext'; // Le contexte admin
import ModalAddRole from './ModalAddRole'; 
import ModalEditRole from './ModalUpdateRole'; 
import ModalConfirmation from '../users/ModalConfirmation'; 
import { deleteRole } from '../../../services/admin/rolesService'; // La fonction pour supprimer un rôle

const RolePage = () => {
    const { roles,setMessageNotification } = useContext(AdminContext) 
    const [roleData, setRoleData] = useState([]) 
    const [roleDataUpdate, setRoleDataUpdate] = useState('') 

    const [showModalAddRole, setShowModalAddRole] = useState(false); 
    const [showModalEditRole, setShowModalEditRole] = useState(false); 
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false); 
    const [idRoleToDelete, setIdRoleToDelete] = useState(null); // Le state pour stocker l'id du rôle à supprimer

    // Un effet pour mettre à jour le state des rôles quand le contexte change
    useEffect(() => {
        setRoleData(roles)
    }, [roles,])

    // Les fonctions pour ouvrir et fermer les modals
    const handleModalAddRoleOpen = () => {
        setShowModalAddRole(true);
    };
    const handleModalAddRoleClose = () => {
        setShowModalAddRole(false);
    };
    const handleModalEditRoleOpen = (role) => {
        setRoleDataUpdate(role)
        setShowModalEditRole(true);
    };
    const handleModalEditRoleClose = () => {
        setShowModalEditRole(false);
    };
    const handleModalDeleteRoleOpen = (roleId) => {
        setShowModalDeleteRole(true);
        setIdRoleToDelete(roleId)
    };
    const handleModalDeleteRoleClose = () => {
        setShowModalDeleteRole(false);
    };

    // La fonction pour confirmer la suppression d'un rôle
    const handleConfirmDeleteRole = async (roleId) =>{
        const response = await deleteRole(roleId)
        setMessageNotification(response.message)
    }


    // Le rendu du composant
    return (
        <div className="d-flex flex-column gap-3 ">
            <div
                className=" bg-dark page-header " >
                <div className="d-flex  gap-3" >
                    {}
                    <button onClick={()=>handleModalAddRoleOpen()} className="btn btn-primary form-control" >
                        Ajouter un role
                    </button>
                </div>
            </div>
            <div className='px-3 table-responsive'>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th className='text-left' scope="col">Name</th>
                            <th className='text-center' scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleData.map((role, index) => (
                            <tr key={index}>
                                <th scope="row">{role.id}</th>
                                <td>{role.name}</td>

                                <td className="align-middle text-center">
                                    <FaEdit onClick={()=>handleModalEditRoleOpen(role)} className="action-icon mr-2 text-primary "  size={22} />
                                    <FaTrash onClick={()=>handleModalDeleteRoleOpen(role.id)} className="action-icon mx-2 text-danger "  size={22} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalAddRole showModal={showModalAddRole} handleModalClose={handleModalAddRoleClose} />
                <ModalEditRole roleData={roleDataUpdate} showModal={showModalEditRole} handleModalClose={handleModalEditRoleClose} />
                <ModalConfirmation show={showModalDeleteRole} handleConfirm={handleConfirmDeleteRole} id={idRoleToDelete} handleModalClose={handleModalDeleteRoleClose} />
            </div>
        </div>
    )
}

export default RolePage
