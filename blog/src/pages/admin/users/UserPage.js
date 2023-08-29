import React, { useState, useEffect, useContext } from 'react'
import Search from '../../../component/Search'
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirmation from './ModalConfirmation';
import { AdminContext } from '../../../utils/adminContext';
import { deleteUser } from '../../../services/admin/userService';
import "../../../styles/dashbord/userPage.css";


const UserPage = () => {
    const { users, setMessageNotification } = useContext(AdminContext)
    const [data, setData] = useState([])
    //console.log('users:', userData)
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [idUserToDelete, setIdUserToDelete] = useState(null);
    const [editUserData, setEditUserData] = useState(null);


    useEffect(() => {
        setData(users)
    }, [users])

    const handleModalAddUserOpen = () => {
        setShowModalAddUser(true);
    };

    const handleModalAddUserClose = () => {
        setShowModalAddUser(false);
    };
    const handleModalEditUserOpen = (userData) => {
        setEditUserData(userData);
        setShowModalEditUser(true);
    };
    const handleModalEditUserClose = () => {
        setShowModalEditUser(false);
    };

    const handleModalDeleteUserOpen = (userId) => {
        setIdUserToDelete(userId);
        setShowModalDeleteUser(true);
    };
    const handleModalDeleteUserClose = () => {
        setShowModalDeleteUser(false);
    };


    const handleConfirmDeleteUser = (userId) => {
        deleteUser(userId, setMessageNotification)
    };



    return (
        <div className="d-flex flex-column gap-3 ">
            <div
                className=" bg-dark user-page-header "
                 >
                <div className="d-flex  gap-3" >
                    <Search placeholder={'users'}
                        data={users} setData={setData} model={'user'}
                    />
                    <button className="btn btn-primary form-control" onClick={() => handleModalAddUserOpen()} >
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>
            <div className='px-3 table-responsive'>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th className='text-left' scope="col">Nom</th>
                            <th className='text-left' scope="col">Email</th>
                            <th className='text-left' scope="col">Roles</th>
                            <th className='text-center' scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="align-middle text-center">
                                    <FaEdit onClick={() => handleModalEditUserOpen(user)} className="action-icon mr-2 text-primary" size={22} />
                                    <FaTrash onClick={() => handleModalDeleteUserOpen(user.id)} className="action-icon mx-2 text-danger" size={22} />
                                    {/* <FaEye className="action-icon ml-2 text-secondary cursor-pointer" size={22}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ModalEditUser userData={editUserData} showModal={showModalEditUser} handleModalClose={handleModalEditUserClose} />
                <ModalConfirmation handleConfirm={handleConfirmDeleteUser} id={idUserToDelete} show={showModalDeleteUser} handleModalClose={handleModalDeleteUserClose} />
                <ModalAddUser showModal={showModalAddUser} handleModalClose={handleModalAddUserClose} />
            </div>
        </div>
    )
}

export default UserPage