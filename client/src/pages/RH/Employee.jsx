import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import api from "@/lib/api";
import { SearchIcon } from "@/icons/Icons";
import toast, { Toaster } from "react-hot-toast";

function Employee() {
  const [currentStep, setCurrentStep] = useState(1);
  const [newEmployee, setNewEmployee] = useState({
    nombre: "",
    apellido_pa: "",
    apellido_ma: "",
    rfc: "",
    calle: "",
    numero_ext: "",
    numero_int: "",
    cod_Postal: "",
    estado: "",
    pais: "",
    horario_id: "",
    nomina_id: "",
  });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    rol: "",
  });
  const [horarios, setHorarios] = useState([]);
  const [nominas, setNominas] = useState([]);

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
  const employeesPerPage = 10;

  useEffect(() => {
    const loadHorarios = async () => {
      try {
        const res = await api.get("api/v1/horarios/");
        setHorarios(res.data);
      } catch (error) {}
    };
    loadHorarios();
  }, []);

  useEffect(() => {

    const loadNominas = async () => {
      try {
        const res = await api.get("api/v1/nominas/");
        setNominas(res.data);
      } catch (error) {}
    };
    loadNominas();
  }, []);

  // Fetch employees
  useEffect(() => {

    const loadEmployees = async () => {
      try {
        const res = await api.get("api/v1/empleados/");
        setEmployees(res.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    //let interval = setInterval(() => {
      loadEmployees();
    //}, 100)
    //return () => {
    //  clearInterval(interval)
    //}

  }, []);

  // Fetch roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await api.get("api/v1/roles/");
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRoles();
  }, []);



  const filteredEmployees = employees.filter((employee) => {
    const searchRole =
      selectedRol === "" || employee.user.rol.id_rol === parseInt(selectedRol);
    const searchN =
      employee.nombre.toLowerCase().includes(search.toLowerCase()) ||
      employee.apellido_pa.toLowerCase().includes(search.toLowerCase()) ||
      employee.apellido_ma.toLowerCase().includes(search.toLowerCase()) ||
      employee.user.email.toLowerCase().includes(search.toLowerCase());
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

  const openAddModal = () => {
    setModalContent("Agregar empleado");
    setCurrentEmployee(null);
    //setEmployeeRol("");
    setIsModalAddOpen(true);
  };
  const openEditModal = (employee) => {
    setModalContent("Editar empleado");
    setCurrentEmployee(employee);
    setNewEmployee({
      nombre: employee.nombre || "",
      apellido_pa: employee.apellido_pa || "",
      apellido_ma: employee.apellido_ma || "",
      rfc: employee.rfc || "",
      calle: employee.calle || "",
      numero_ext: employee.numero_ext || "",
      numero_int: employee.numero_int || "",
      cod_Postal: employee.cod_Postal || "",
      estado: employee.estado || "",
      pais: employee.pais || "",
      horario_id: employee.horario_id || "",
      nomina_id: employee.nomina_id || "",
    });
    setIsModalEditOpen(true);
  };
  const openDeleteModal = (employee) => {
    setModalContent("Eliminar empleado");
    setCurrentEmployee(employee);
    setIsModalDeleteOpen(true);
  };

  const closeAddModal = () => {
    setIsModalAddOpen(false);
    //setEmployeeRol("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Campo:", name, "Valor:", value);
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setNewUser({ ...newUser, [name]: value });
  };

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

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    const adjustedEmployee = {
      ...newEmployee,
      nomina_id: newEmployee.nomina_id,
      horario_id: newEmployee.horario_id,
    };

    console.log("Datos enviados:", adjustedEmployee);
    try {
      const res = await api.post(
        "api/v1/empleados/registrar/",
        adjustedEmployee
      );
      console.log("Respuesta de Empleado:", res);
      if (res.status === 201) { 
        const response = await api.post(
          "api/v1/user/register/",
          newUser
        )
        console.log(response)
        if (response.status === 201){
          toast.success("Se ha agregado el empleado correctamente");
          setEmployees([...employees, res.data]);
          setNewEmployee("")
          setNewUser("")
          setCurrentStep(1)
          setIsModalAddOpen(false);
        }

      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentEmployee)
  const handleEditEmployee = async (e) => {
    e.preventDefault()
    const adjustedEmployee = {
      ...newEmployee,
      nomina_id: newEmployee.nomina_id,
      horario_id: newEmployee.horario_id,
    };
  
    const adjustedUser = {
      ...newUser,
      role: newUser.rol,
    };
  
    console.log("Datos enviados para editar empleado:", adjustedEmployee);
    console.log("Datos enviados para editar usuario:", adjustedUser);
  
    try {
      // Editar empleado
      const employeeRes = await api.put(
        `api/v1/empleados/editar/${currentEmployee.id}/`,
        adjustedEmployee
      );
  
      console.log("Respuesta de edición de empleado:", employeeRes);
  
      if (employeeRes.status === 200) {
        // Editar usuario
        const userRes = await api.put(
          `api/v1/user/edit/${currentEmployee.user.id}/`,
          adjustedUser
        );
  
        console.log("Respuesta de edición de usuario:", userRes);
  
        if (userRes.status === 200) {
          // Mostrar notificación de éxito
          toast.success("El empleado y el usuario han sido actualizados correctamente");

          // Limpiar estados y cerrar modal
          setNewEmployee("");
          setNewUser("");
          setCurrentStep(1);
          setIsModalEditOpen(false);
        } else {
          toast.error("Hubo un error al actualizar el usuario");
        }
      } else {
        toast.error("Hubo un error al actualizar el empleado");
      }
    } catch (error) {
      console.error("Error al editar empleado/usuario:", error);
      toast.error("Hubo un error al conectar con el servidor");
    }
  };
  

  const deleteEmployee = async (id) => {
    try {
      const res = await api.delete(`/api/v1/user/delete/${id}/`);
      setEmployees(employees.filter((employee) => employee.user.id !== id));
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
                <th className="p-2 text-center">RFC</th>
                <th className="p-2 text-center">Direccion</th>
                <th className="p-2 text-center">ROL</th>
                <th className="p-2 text-center">TURNO</th>
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
                      {user.nombre} {user.apellido_pa} {user.apellido_ma}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.user.email}
                    </div>
                  </td>
                  <td className="p-2">
                    <span className="flex items-center justify-center font-bold">
                      {user.rfc}
                    </span>
                  </td>
                  <td className="p-2 font-bold">
                    {user.calle} #{user.numero_ext}, {user.estado},{" "}
                    {user.cod_Postal}, {user.pais}
                  </td>
                  <td className="p-2 font-bold">{user.user.rol?.nombre_rol || "Sin rol"}</td>
                  <td className="p2- font-bold">{user.horario?.turno || "Sin turno"}</td>
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
        <form onSubmit={handleAddEmployee} className="w-full">
          <div className="mb-4">
            {currentStep === 1 && (
              <>
                <h1 className="font-bold text-lg mb-4">Información personal</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={newEmployee.nombre}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Juan Alberto"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      name="apellido_pa"
                      value={newEmployee.apellido_pa}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Lainez"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      name="apellido_ma"
                      value={newEmployee.apellido_ma}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Ortiz"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      RFC
                    </label>
                    <input
                      type="text"
                      name="rfc"
                      value={newEmployee.rfc}
                      maxLength={13}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="LAOJ050102KL4"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h1 className="font-bold text-lg mb-4">
                  Información domiciliaria
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Calle:
                    </label>
                    <input
                      type="text"
                      name="calle"
                      value={newEmployee.calle}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="5 de febrero"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Numero EXT:
                    </label>
                    <input
                      type="number"
                      name="numero_ext"
                      value={newEmployee.numero_ext}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="701"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Numero INT:
                    </label>
                    <input
                      type="number"
                      name="numero_int"
                      value={newEmployee.numero_int}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="16"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Codigo Postal:
                    </label>
                    <input
                      type="number"
                      name="cod_Postal"
                      value={newEmployee.cod_Postal}
                      onChange={handleChange}
                      maxLength={5}
                      className="border rounded w-full py-2 px-3"
                      placeholder="16"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Estado:
                    </label>
                    <input
                      type="text"
                      name="estado"
                      value={newEmployee.estado}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Durango"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Pais:
                    </label>
                    <input
                      type="text"
                      name="pais"
                      value={newEmployee.pais}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="México"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h1 className="font-bold text-lg mb-4">Perfil de empleado</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nomina
                    </label>
                    <select
                      value={newEmployee.nomina_id}
                      name="nomina_id"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Nómina
                      </option>
                      {nominas.map((nomina) => (
                        <option key={nomina.id_nom} value={nomina.id_nom}>
                          {nomina.referencia}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Horario
                    </label>
                    <select
                      value={newEmployee.horario_id}
                      name="horario_id"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Horario
                      </option>
                      {horarios.map((horario) => (
                        <option
                          key={horario.id_horario}
                          value={horario.id_horario}
                        >
                          {horario.turno}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h1>Crear usuario</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Usuario:
                        </label>
                        <input
                      type="text"
                      name="username"
                      value={newUser.username}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="juanito"
                      required
                    />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                        </label>
                        <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="example@domino.com"
                      required
                    />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                        </label>
                        <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="*******"
                      required
                    />
                    </div>
                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Cargo administrativo:
                    </label>
                    <select
                      value={newUser.rol}
                      name="rol"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Cargo
                      </option>
                      {roles.map((rol) => (
                        <option
                          key={rol.id_rol}
                          value={rol.id_rol}
                        >
                          {rol.nombre_rol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Controles de Navegación */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Atrás
              </button>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Siguiente
              </button>
            )}
            {currentStep === 4 && (
              <button
                type="submit"
                className={`px-4 py-2 rounded bg-blue-500 text-white`}
              >
                Agregar empleado
              </button>
            )}
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        onClose={closeEditModal}
      >
        <form onSubmit={handleEditEmployee} className="w-full">
          <div className="mb-4">
            {currentStep === 1 && (
              <>
                <h1 className="font-bold text-lg mb-4">Información personal</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={newEmployee.nombre}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Juan Alberto"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      name="apellido_pa"
                      value={newEmployee.apellido_pa}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Lainez"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      name="apellido_ma"
                      value={newEmployee.apellido_ma}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Ortiz"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      RFC
                    </label>
                    <input
                      type="text"
                      name="rfc"
                      value={newEmployee.rfc}
                      maxLength={13}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="LAOJ050102KL4"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h1 className="font-bold text-lg mb-4">
                  Información domiciliaria
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Calle:
                    </label>
                    <input
                      type="text"
                      name="calle"
                      value={newEmployee.calle}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="5 de febrero"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Numero EXT:
                    </label>
                    <input
                      type="number"
                      name="numero_ext"
                      value={newEmployee.numero_ext}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="701"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Numero INT:
                    </label>
                    <input
                      type="number"
                      name="numero_int"
                      value={newEmployee.numero_int}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="16"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Codigo Postal:
                    </label>
                    <input
                      type="number"
                      name="cod_Postal"
                      value={newEmployee.cod_Postal}
                      onChange={handleChange}
                      maxLength={5}
                      className="border rounded w-full py-2 px-3"
                      placeholder="16"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Estado:
                    </label>
                    <input
                      type="text"
                      name="estado"
                      value={newEmployee.estado}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="Durango"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Pais:
                    </label>
                    <input
                      type="text"
                      name="pais"
                      value={newEmployee.pais}
                      onChange={handleChange}
                      className="border rounded w-full py-2 px-3"
                      placeholder="México"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h1 className="font-bold text-lg mb-4">Perfil de empleado</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nomina
                    </label>
                    <select
                      value={newEmployee.nomina_id}
                      name="nomina_id"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Nómina
                      </option>
                      {nominas.map((nomina) => (
                        <option key={nomina.id_nom} value={nomina.id_nom}>
                          {nomina.referencia}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Horario
                    </label>
                    <select
                      value={newEmployee.horario_id}
                      name="horario_id"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Horario
                      </option>
                      {horarios.map((horario) => (
                        <option
                          key={horario.id_horario}
                          value={horario.id_horario}
                        >
                          {horario.turno}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                     Cargo
                    </label>
                    <select
                      value={newUser.id_rol}
                      name="id_rol"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Seleccionar Cargo
                      </option>
                      {roles.map((rol) => (
                        <option
                          key={rol.id_rol}
                          value={rol.id_rol}
                        >
                          {rol.nombre_rol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

          </div>
          {/* Controles de Navegación */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Atrás
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Siguiente
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className={`px-4 py-2 rounded bg-blue-500 text-white`}
              >
                Agregar empleado
              </button>
            )}
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
                currentEmployee && deleteEmployee(currentEmployee.user.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Si, estoy seguro/a
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Employee;
