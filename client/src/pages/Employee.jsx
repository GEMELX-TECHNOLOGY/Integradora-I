import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import api from "@/lib/api";
import { SearchIcon } from "@/icons/Icons";
import toast, { Toaster } from 'react-hot-toast';

function Employee() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRol, setSelectedRol] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [firstName, setFirstName] = useState(
    currentEmployee ? currentEmployee.first_name : ""
  );
  const [lastName, setLastName] = useState(
    currentEmployee ? currentEmployee.last_name : ""
  );
  const [email, setEmail] = useState(
    currentEmployee ? currentEmployee.email : ""
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeRol, setEmployeeRol] = useState(
    currentEmployee ? currentEmployee.rol : ""
  );
  const [employeeImage, setEmployeeImage] = useState(null);

  const employeesPerPage = 10;

  // Fetch employees
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await api.get("api/users/");
        setEmployees(res.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    loadEmployees();
  }, []);

  // Fetch roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await api.get("api/roles/");
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRoles();
  }, []);

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id_rol === roleId);
    return role ? role.nombre_rol : "Sin rol";
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchRole =
      selectedRol === "" || employee.rol === parseInt(selectedRol);
    const searchN =
      employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    return searchRole && searchN;
  });

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleRolChange = (e) => {
    setSelectedRol(e.target.value);
    setCurrentPage(1);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const openAddModal = () => {
    setModalContent("Agregar empleado");
    setCurrentEmployee(null);
    setEmployeeRol("");
    setIsModalAddOpen(true);
  };

  const openEditModal = (employee) => {
    setModalContent("Editar empleado");
    setCurrentEmployee(employee);
    setFirstName(employee.first_name);
    setLastName(employee.last_name);
    setEmail(employee.email);
    setEmployeeRol(employee.rol);
    setEmployeeImage(null);
    setIsModalEditOpen(true);
  };

  const openDeleteModal = (employee) => {
    setModalContent("Eliminar empleado");
    setCurrentEmployee(employee);
    setIsModalDeleteOpen(true);
  };

  const closeAddModal = () => {
    setIsModalAddOpen(false);
    setEmployeeRol("");
    setCurrentEmployee(null);
  };

  const closeEditModal = () => {
    setIsModalEditOpen(false);
    setEmployeeRol("");
    setCurrentEmployee(null);
  };
  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const handleRolChangeInForm = (e) => {
    setEmployeeRol(e.target.value);
  };

  const succesAdd = () =>
    toast.success("El registro se ha agregado correctamente");
  const errorAdd = () =>
    toast.error("Ha ocurrido un error al agregar el registro", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const succesEdit = () =>
    toast.success("El registro se ha editado correctamente", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorEdit = () =>
    toast.error("Ha ocurrido un error al editar el registro", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const succesDelete = () =>
    toast.success("El registro se ha eliminado correctamente", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorDelete = () =>
    toast.error("Ha ocurrido un error al eliminar el registro", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const addEmployee = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("rol", employeeRol);

    if (employeeImage) {
      formData.append("image", employeeImage);
    }

    try {
      const res = await api.post("/api/user/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      setEmployees([...employees, res.data]);
      closeAddModal();
      succesAdd();
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
      errorAdd();
    }
  };

  const editEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("rol", employeeRol);
    if (employeeImage) {
      formData.append("image", employeeImage);
    }

    try {
      const res = await api.put(
        `/api/user/edit/${currentEmployee.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedEmployees = employees.map((emp) =>
        emp.id === currentEmployee.id ? res.data : emp
      );
      setEmployees(updatedEmployees);
      closeEditModal();
      succesEdit();
    } catch (error) {
      console.error(
        "Error al editar el empleado:",
        error.response ? error.response.data : error.message
      );
      errorEdit();
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await api.delete(`/api/user/delete/${id}/`);
      setEmployees(employees.filter((employee) => employee.id !== id));
      succesDelete();
      closeDeleteModal();
    } catch (err) {
      console.error("Error al eliminar el empleado:", err);
      errorDelete();
    }
  };
  return (
    <div className="flex h-screen">
      <Toaster />
      <Navigation />
      <div className="flex-1">
        <Header />
        <div className="flex flex-col ml-11 underline-offset-1">
          <div className="flex justify-between max-w-[1450px]">
            <select
              className="bg-white border-transparent shadow-lg w-auto h-[36px] rounded-[10px] ml-4 text-center"
              value={selectedRol}
              onChange={handleRolChange}
            >
              <option value="">Todas</option>
              {roles.map((role) => (
                <option key={role.id_rol} value={role.id_rol}>
                  {role.nombre_rol}
                </option>
              ))}
            </select>
            <div className="flex flex-row max-w-max pl-10">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  placeholder="Buscar empleado..."
                  value={search}
                  className="max-w-max h-10 px-6 py-4 shadow-lg border-2 rounded-lg pl-10"
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <button
              className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
              onClick={openAddModal}
            >
              Agregar empleado
            </button>
          </div>
          <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
          <div className="flex justify-between max-w-[1500px]">
            <span className="pt-2 font-400 text-[#849AA9]">
              Página {currentPage} de {totalPages}
            </span>
            <div className="pr-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 rounded"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <table className="min-w-[1450px] bg-white shadow-md rounded-lg text-center">
            <thead className=" bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">NOMBRE</th>
                <th className="p-2 text-center">ESTATUS</th>
                <th className="p-2 text-center">ROL</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((user, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 text-gray-800"
                >
                  <td className="p-2">
                    <div className="font-bold">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="p-2">
                    <span className="flex items-center justify-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-blue-500 font-semibold">
                        Activo
                      </span>
                    </span>
                    <div className="text-sm text-gray-500">
                      Fecha Ingreso: {formatDate(user.date_joined)}
                    </div>
                  </td>
                  <td className="p-2">{getRoleName(user.rol)}</td>
                  <td className="p-2 flex space-x-2 justify-center items-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => openEditModal(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => openDeleteModal(user)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalAddOpen}
        onClose={closeAddModal}
        title="Agregar Empleado"
      >
        <form onSubmit={addEmployee}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apellido
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el apellido"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rol
            </label>
            <select
              className="bg-white border-transparent shadow-lg w-full h-[36px] rounded-[10px] text-center"
              value={employeeRol}
              onChange={(e) => setEmployeeRol(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role.id_rol} value={role.id_rol}>
                  {role.nombre_rol}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-1">
              Imagen del empleado
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEmployeeImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar empleado
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        onClose={closeDeleteModal}
        title={modalContent}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            Estas seguro/a de eliminar este registro?
          </h1>
          <p className="text-sm text-black/70 ml-5">
            ESTA ACCION NO SE PUEDE DESHACER
          </p>
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              onClick={() => closeDeleteModal()}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={() =>
                currentEmployee && deleteEmployee(currentEmployee.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Si, estoy seguro/a
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        onClose={closeEditModal}
        title={modalContent}
      >
        <form onSubmit={editEmployee}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apellido
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el apellido"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rol
            </label>
            <select
              className="bg-white border-transparent shadow-lg w-full h-[36px] rounded-[10px] text-center"
              value={employeeRol}
              onChange={handleRolChangeInForm}
            >
              {roles.map((role) => (
                <option key={role.id_rol} value={role.id_rol}>
                  {role.nombre_rol}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-1">
              Imagen del empleado
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEmployeeImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Employee;
