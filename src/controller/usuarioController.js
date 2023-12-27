import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  const { correo } = req.body;

  const existeUsuario = await Usuario.findOne({ correo });
  if (existeUsuario) {
    const error = new Error("El usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    const usuarioGuardado = await usuario.save();
    res.json(usuarioGuardado);
  } catch (error) {
    console.log(error);
  }
};
const perfil = (req, res) => {
  res.send("Perfil");
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const confirmarUsuario = await Usuario.findOne({ token });
  if (!confirmarUsuario) {
    const error = new Error("El token no es valido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    confirmarUsuario.token = null;
    confirmarUsuario.confirmado = true;
    await confirmarUsuario.save();
    res.send({ msg: "Usuarion Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};
const autenticar = async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ correo });

  // Comprobar si el usuario existe
  if (usuario) {
    console.log("si esxite");
  } else {
    const error = new Error("El usuario no es valido");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario a sido confirmado
  if (!usuario.confirmado) {
    const error = new Error("El usuario no a sido confirmado");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    console.log("password correcto");
  } else {
    console.log("password incorrecto");
  }
};

export { registrar, perfil, confirmar, autenticar };
