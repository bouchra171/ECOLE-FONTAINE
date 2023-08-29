import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteCategory } from '../../../services/admin/categoryService';
import ModalAddCategory from './ModalAddCategory';
import ModalConfirmation from '../users/ModalConfirmation';
import { AdminContext } from '../../../utils/adminContext';
import ModalEditCategory from './ModalEditCategory';

const CategoryPage = () => {
    const [categoryData, setCategoryData] = useState([])
    const { setMessageNotification, categories } = useContext(AdminContext)

    const [categoryDataUpdate, setCategoryDataUpdate] = useState('')

    const [showModalAddCategory, setShowModalAddCategory] = useState(false);
    const [showModalEditCategory, setShowModalEditCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
    const [idCategoryToDelete, setIdCategoryToDelete] = useState(null);

    useEffect(() => {

        setCategoryData(categories);

    }, [categories]);


    const handleModalAddCategoryOpen = () => {
        setShowModalAddCategory(true);
    };

    const handleModalAddCategoryClose = () => {
        setShowModalAddCategory(false);
    };
    const handleModalEditCategoryOpen = (Category) => {
        setCategoryDataUpdate(Category)
        setShowModalEditCategory(true);
    };

    const handleModalEditCategoryClose = () => {
        setShowModalEditCategory(false);
    };

    const handleModalDeleteCategoryOpen = (categoryId) => {
        setShowModalDeleteCategory(true);
        setIdCategoryToDelete(categoryId)
    };

    const handleModalDeleteCategoryClose = () => {
        setShowModalDeleteCategory(false);
    };

    const handleConfirmDeleteCategory = async (CategoryId) => {
        const response = await deleteCategory(CategoryId)
        setMessageNotification(response.message)
    }
    return (
        <div className="d-flex flex-column gap-3 ">
            <div
                className=" bg-dark page-header" >
                <div className="d-flex  gap-3" >

                    <button onClick={() => handleModalAddCategoryOpen()} className="btn btn-primary form-control" >
                        Ajouter un category
                    </button>
                </div>
            </div>
            <div className='px-3 table-responsive'>

                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th className='text-left' scope="col">Nom</th>
                            <th className='text-center' scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData?.map((category, index) => (
                            <tr key={index}>
                                <th scope="row">{category.id}</th>
                                <td>{category.category_name}</td>

                                <td className="align-middle text-center">
                                    <FaEdit onClick={() => handleModalEditCategoryOpen(category)} className="action-icon mr-2 text-primary cursor-pointer" size={22} />
                                    <FaTrash onClick={() => handleModalDeleteCategoryOpen(category.id)} className="action-icon mx-2 text-danger cursor-pointer" size={22} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalAddCategory showModal={showModalAddCategory} handleModalClose={handleModalAddCategoryClose} />
                <ModalEditCategory categoryData={categoryDataUpdate} showModal={showModalEditCategory} handleModalClose={handleModalEditCategoryClose} />
                <ModalConfirmation show={showModalDeleteCategory} handleConfirm={handleConfirmDeleteCategory} id={idCategoryToDelete} handleModalClose={handleModalDeleteCategoryClose} />

            </div>
        </div>
    )
}

export default CategoryPage