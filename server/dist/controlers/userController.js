"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerDatosUsuario = exports.CrearActividadFisica = exports.CrearNutricion = exports.CrearHabitos = exports.CrearEmbarazoActual = exports.CrearAntecedentesObstetricos = exports.CrearDatosMedicos = exports.LoginUsuario = exports.CrearUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../models/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inference_1 = require("@huggingface/inference");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hf = new inference_1.HfInference(process.env.HUGGINGFACE_TOKEN);
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, contraseña, fecha_nacimiento, telefono } = req.body;
    console.log(nombre);
    // Validación de entrada
    if (!nombre || !correo || !contraseña || !fecha_nacimiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        // Verificar si el correo ya existe
        const existingUser = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Encriptar la contraseña
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(contraseña, salt);
        // Insertar el usuario en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO usuario (nombre, apellido, correo, contraseña, fecha_nacimiento, telefono)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [nombre, apellido, correo, hashedPassword, fecha_nacimiento, telefono], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
exports.CrearUsuario = CrearUsuario;
const LoginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    // Validación de entrada
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        // Verificar si el usuario existe
        const existingUser = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        if (existingUser.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        const usuario = existingUser[0];
        // Verificar la contraseña
        const contraseñaValida = bcrypt_1.default.compareSync(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        // Generar JWT (puedes comentar esta parte si no es necesaria por ahora)
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, correo: usuario.correo }, process.env.SECRET_KEY || '123');
        // Respuesta exitosa
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});
exports.LoginUsuario = LoginUsuario;
const CrearDatosMedicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, alguna_medicacion, altura, peso, hipertiroidismo, hipotiroidismo, hipertension, asma, cancer, ETS, ansiedad, depresion, diabetes, enfermedad_cardiaca, enfermedad_renal } = req.body;
    // Validación de entrada
    if (!usuario_id || altura === undefined || peso === undefined) {
        return res.status(400).json({ message: 'Usuario ID, altura y peso son campos obligatorios' });
    }
    try {
        // Insertar los datos médicos en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO datos_medicos (
          usuario_id,
          alguna_medicacion,
          altura,
          peso,
          hipertiroidismo,
          hipotiroidismo,
          hipertension,
          asma,
          cancer,
          ETS,
          ansiedad,
          depresion,
          diabetes,
          enfermedad_cardiaca,
          enfermedad_renal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                alguna_medicacion,
                altura,
                peso,
                hipertiroidismo,
                hipotiroidismo,
                hipertension,
                asma,
                cancer,
                ETS,
                ansiedad,
                depresion,
                diabetes,
                enfermedad_cardiaca,
                enfermedad_renal
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Datos médicos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los datos médicos' });
    }
});
exports.CrearDatosMedicos = CrearDatosMedicos;
const CrearAntecedentesObstetricos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, embarazos_previos, preeclampsia, parto_prematuro, hemorragias, perdida } = req.body;
    // Validación de entrada
    if (!usuario_id || embarazos_previos === undefined) {
        return res.status(400).json({ message: 'Usuario ID y embarazos previos son campos obligatorios' });
    }
    try {
        // Insertar los antecedentes obstétricos en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO antecedentes_obstetricos (
          usuario_id,
          embarazos_previos,
          preeclampsia,
          parto_prematuro,
          hemorragias,
          perdida
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                embarazos_previos,
                preeclampsia,
                parto_prematuro,
                hemorragias,
                perdida
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Antecedentes obstétricos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los antecedentes obstétricos' });
    }
});
exports.CrearAntecedentesObstetricos = CrearAntecedentesObstetricos;
const CrearEmbarazoActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, enfermedad_actual, bajo_liquido_amniotico, alto_liquido_amniotico, anomalia_fetal, crecimiento_disminuido, in_vitro, gestacion_multiple, semanas_embarazo, numero_fetos } = req.body;
    // Validación de entrada
    if (!usuario_id || semanas_embarazo === undefined || numero_fetos === undefined) {
        return res.status(400).json({ message: 'Usuario ID, semanas de embarazo y número de fetos son campos obligatorios' });
    }
    try {
        // Insertar la información del embarazo actual en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO embarazo_actual (
          usuario_id,
          enfermedad_actual,
          bajo_liquido_amniotico,
          alto_liquido_amniotico,
          anomalia_fetal,
          crecimiento_disminuido,
          in_vitro,
          gestacion_multiple,
          semanas_embarazo,
          numero_fetos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                enfermedad_actual,
                bajo_liquido_amniotico,
                alto_liquido_amniotico,
                anomalia_fetal,
                crecimiento_disminuido,
                in_vitro,
                gestacion_multiple,
                semanas_embarazo,
                numero_fetos
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información del embarazo actual creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información del embarazo actual' });
    }
});
exports.CrearEmbarazoActual = CrearEmbarazoActual;
const CrearHabitos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, bebidas_alcoholicas, tipo_alcohol, frecuencia_alcohol, drogas, tipo_droga, frecuencia_droga, tabaco, frecuencia_tabaco, hogar_libre_tabaco } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar los hábitos en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO habitos (
          usuario_id,
          bebidas_alcoholicas,
          tipo_alcohol,
          frecuencia_alcohol,
          drogas,
          tipo_droga,
          frecuencia_droga,
          tabaco,
          frecuencia_tabaco,
          hogar_libre_tabaco
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                bebidas_alcoholicas,
                tipo_alcohol,
                frecuencia_alcohol,
                drogas,
                tipo_droga,
                frecuencia_droga,
                tabaco,
                frecuencia_tabaco,
                hogar_libre_tabaco
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Hábitos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los hábitos' });
    }
});
exports.CrearHabitos = CrearHabitos;
const CrearNutricion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, dieta, frutas, verduras, carnes, comida_rapida, legumbres, mariscos, lacteos, numero_comidas, numero_vasos, comidas_fuera_casa } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar la información nutricional en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO nutricion (
          usuario_id,
          dieta,
          frutas,
          verduras,
          carnes,
          comida_rapida,
          legumbres,
          mariscos,
          lacteos,
          numero_comidas,
          numero_vasos,
          comidas_fuera_casa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                dieta,
                frutas,
                verduras,
                carnes,
                comida_rapida,
                legumbres,
                mariscos,
                lacteos,
                numero_comidas,
                numero_vasos,
                comidas_fuera_casa
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información nutricional creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información nutricional' });
    }
});
exports.CrearNutricion = CrearNutricion;
const CrearActividadFisica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, actividad_fisica, frecuencia_actividad, tiempo_actividad } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar la información de actividad física en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO actividad_fisica (
          usuario_id,
          actividad_fisica,
          frecuencia_actividad,
          tiempo_actividad
        ) VALUES (?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                actividad_fisica,
                frecuencia_actividad,
                tiempo_actividad
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información de actividad física creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información de actividad física' });
    }
});
exports.CrearActividadFisica = CrearActividadFisica;
const ObtenerDatosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.params;
    console.log(correo);
    if (!correo) {
        return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    }
    try {
        // Obtener datos del usuario
        const usuario = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const usuarioId = usuario[0].id;
        // Obtener datos médicos
        const datosMedicos = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM datos_medicos WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Obtener antecedentes obstétricos
        const antecedentesObstetricos = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM antecedentes_obstetricos WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Obtener embarazo actual
        const embarazoActual = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM embarazo_actual WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Obtener hábitos
        const habitos = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM habitos WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Obtener nutrición
        const nutricion = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM nutricion WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Obtener actividad física
        const actividadFisica = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM actividad_fisica WHERE usuario_id = ?', [usuarioId], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Construir objeto de respuesta
        const datosUsuario = {
            usuario: usuario[0],
            datosMedicos: datosMedicos[0] || null,
            antecedentesObstetricos: antecedentesObstetricos[0] || null,
            embarazoActual: embarazoActual[0] || null,
            habitos: habitos[0] || null,
            nutricion: nutricion[0] || null,
            actividadFisica: actividadFisica[0] || null
        };
        // Eliminar la contraseña del objeto de respuesta
        delete datosUsuario.usuario.contraseña;
        // Crear el prompt para la IA
        //const promptParaIA = crearPromptSimplificado(datosUsuario);
        // Obtener recomendaciones de la IA
        //const recomendaciones = await obtenerRecomendacionesIA(promptParaIA, datosUsuario);
        const recomendaciones = yield obtenerRecomendacionesLocales(datosUsuario);
        // Incluir el prompt y las recomendaciones en la respuesta
        res.status(200).json({
            datosUsuario,
            //promptParaIA,
            recomendaciones
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos y recomendaciones' });
    }
});
exports.ObtenerDatosUsuario = ObtenerDatosUsuario;
function crearPromptParaIA(datosUsuario) {
    const { usuario, datosMedicos, antecedentesObstetricos, embarazoActual, habitos, nutricion, actividadFisica } = datosUsuario;
    // Calcular la edad
    const fechaNacimiento = new Date(usuario.fecha_nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const prompt = `
Eres un asistente de salud especializado en embarazos. Basándote en la siguiente información de una paciente embarazada, proporciona recomendaciones personalizadas para un embarazo saludable:

Datos personales:
- Edad: ${edad} años
- Altura: ${datosMedicos.altura} cm
- Peso: ${datosMedicos.peso} kg

Datos médicos:
${datosMedicos.hipertension ? '- Hipertensión: Sí\n' : ''}
${datosMedicos.ansiedad ? '- Ansiedad: Sí\n' : ''}
${datosMedicos.depresion ? '- Depresión: Sí\n' : ''}
${datosMedicos.diabetes ? '- Diabetes: Sí\n' : ''}
${datosMedicos.enfermedad_cardiaca ? '- Enfermedad cardíaca: Sí\n' : ''}
${datosMedicos.enfermedad_renal ? '- Enfermedad renal: Sí\n' : ''}

Antecedentes obstétricos:
- Embarazos previos: ${antecedentesObstetricos.embarazos_previos}
${antecedentesObstetricos.preeclampsia ? '- Preeclampsia previa: Sí\n' : ''}
${antecedentesObstetricos.parto_prematuro ? '- Parto prematuro previo: Sí\n' : ''}
${antecedentesObstetricos.hemorragias ? '- Hemorragias previas: Sí\n' : ''}
${antecedentesObstetricos.perdida ? '- Pérdida previa: Sí\n' : ''}

Embarazo actual:
- Semanas de embarazo: ${embarazoActual.semanas_embarazo}
- Número de fetos: ${embarazoActual.numero_fetos}
${embarazoActual.enfermedad_actual ? `- Enfermedad actual: ${embarazoActual.enfermedad_actual}\n` : ''}
${embarazoActual.bajo_liquido_amniotico ? '- Bajo líquido amniótico: Sí\n' : ''}
${embarazoActual.alto_liquido_amniotico ? '- Alto líquido amniótico: Sí\n' : ''}
${embarazoActual.anomalia_fetal ? '- Anomalía fetal: Sí\n' : ''}
${embarazoActual.crecimiento_disminuido ? '- Crecimiento disminuido: Sí\n' : ''}
${embarazoActual.in_vitro ? '- Embarazo in vitro: Sí\n' : ''}
${embarazoActual.gestacion_multiple ? '- Gestación múltiple: Sí\n' : ''}

Hábitos:
${habitos.bebidas_alcoholicas ? `- Consume bebidas alcohólicas (${habitos.tipo_alcohol}) ${habitos.frecuencia_alcohol.toLowerCase()}\n` : ''}
${habitos.tabaco ? `- Fuma ${habitos.frecuencia_tabaco.toLowerCase()}\n` : ''}
${!habitos.hogar_libre_tabaco ? '- No vive en un hogar libre de tabaco\n' : ''}

Nutrición:
${nutricion.dieta ? '- Sigue una dieta específica\n' : ''}
- Consumo de frutas: ${['Bajo', 'Moderado', 'Alto'][nutricion.frutas - 1]}
- Consumo de verduras: ${['Bajo', 'Moderado', 'Alto'][nutricion.verduras - 1]}
- Consumo de carnes: ${['Bajo', 'Moderado', 'Alto'][nutricion.carnes - 1]}
- Consumo de comida rápida: ${['Bajo', 'Moderado', 'Alto'][nutricion.comida_rapida - 1]}
- Consumo de legumbres: ${['Bajo', 'Moderado', 'Alto'][nutricion.legumbres - 1]}
- Consumo de mariscos: ${['Bajo', 'Moderado', 'Alto'][nutricion.mariscos - 1]}
- Consumo de lácteos: ${['Bajo', 'Moderado', 'Alto'][nutricion.lacteos - 1]}
- Número de comidas al día: ${nutricion.numero_comidas}

Actividad física:
${actividadFisica.actividad_fisica ? `- Realiza actividad física ${actividadFisica.frecuencia_actividad.toLowerCase()}, ${actividadFisica.tiempo_actividad} por sesión\n` : '- No realiza actividad física regularmente\n'}

Basándote en esta información, proporciona recomendaciones personalizadas en las siguientes áreas:
1. Control médico y manejo de condiciones existentes
2. Nutrición y suplementación
3. Actividad física y descanso
4. Hábitos a modificar
5. Cuidados especiales considerando los antecedentes obstétricos
6. Salud mental y manejo del estrés

Por favor, proporciona recomendaciones detalladas y específicas para cada área, considerando todos los factores mencionados en el perfil de la paciente.
`;
    return prompt;
}
function crearPromptSimplificado(datosUsuario) {
    const { usuario, datosMedicos, antecedentesObstetricos, embarazoActual, habitos, nutricion, actividadFisica } = datosUsuario;
    return `Genera recomendaciones para una embarazada de ${calcularEdad(usuario.fecha_nacimiento)} años, en la semana ${embarazoActual.semanas_embarazo} de embarazo.
Condiciones médicas: ${datosMedicos.hipertension ? 'hipertensión, ' : ''}${datosMedicos.ansiedad ? 'ansiedad, ' : ''}
Antecedentes: ${antecedentesObstetricos.parto_prematuro ? 'parto prematuro previo, ' : ''}${antecedentesObstetricos.perdida ? 'pérdida previa, ' : ''}
Hábitos: ${habitos.bebidas_alcoholicas ? 'consume alcohol semanalmente, ' : ''}${habitos.tabaco ? 'fuma diariamente, ' : ''}
Actividad física: ${actividadFisica.actividad_fisica ? `realiza actividad ${actividadFisica.frecuencia_actividad.toLowerCase()}` : 'no realiza actividad física regularmente'}

Proporciona recomendaciones breves y específicas para:
1. Control médico
2. Nutrición
3. Actividad física
4. Hábitos saludables
5. Cuidados especiales
6. Salud mental`;
}
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
function obtenerRecomendacionesIA(prompt, datosUsuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Intenta obtener recomendaciones de la IA
            const response = yield hf.textGeneration({
                model: 'EleutherAI/gpt-neo-2.7B',
                inputs: prompt,
                parameters: {
                    max_new_tokens: 250,
                    temperature: 0.7,
                    top_p: 0.95,
                    repetition_penalty: 1.2,
                },
            });
            // Verifica si la respuesta de la IA es útil
            if (response.generated_text.trim() === prompt.trim() || response.generated_text.includes("coconuts")) {
                console.log('La IA no generó recomendaciones útiles. Usando sistema local.');
                return obtenerRecomendacionesLocales(datosUsuario);
            }
            return response.generated_text;
        }
        catch (error) {
            console.error('Error al obtener recomendaciones de la IA:', error);
            console.log('Utilizando sistema de recomendaciones local');
            return obtenerRecomendacionesLocales(datosUsuario);
        }
    });
}
function obtenerRecomendacionesLocales(datosUsuario) {
    const { datosMedicos, antecedentesObstetricos, embarazoActual, habitos, nutricion, actividadFisica } = datosUsuario;
    const recomendaciones = [
        "1. Control médico:",
        "- Asista a citas prenatales regularmente según lo recomendado por su médico.",
        datosMedicos.hipertension ? "- Monitoree su presión arterial diariamente y siga las indicaciones médicas para controlarla." : "",
        datosMedicos.ansiedad ? "- Discuta con su médico opciones para manejar la ansiedad durante el embarazo." : "",
        antecedentesObstetricos.parto_prematuro ? "- Realice pruebas adicionales para monitorear el riesgo de parto prematuro." : "",
        "2. Nutrición:",
        "- Consuma una dieta balanceada rica en frutas, verduras, proteínas magras y granos integrales.",
        "- Tome suplementos prenatales que incluyan ácido fólico, hierro y calcio según lo recomendado por su médico.",
        "- Evite alimentos crudos o poco cocidos, y limite el consumo de cafeína.",
        "- Manténgase bien hidratada bebiendo al menos 8-10 vasos de agua al día.",
        "3. Actividad física:",
        actividadFisica.actividad_fisica ? `- Continúe con su actividad física ${actividadFisica.frecuencia_actividad.toLowerCase()}, ${actividadFisica.tiempo_actividad} por sesión. Consulte a su médico sobre la intensidad adecuada.` : "- Consulte con su médico sobre la actividad física adecuada durante el embarazo.",
        "- Considere actividades de bajo impacto como caminar, nadar o yoga prenatal.",
        "- Evite actividades que impliquen riesgo de caídas o golpes en el abdomen.",
        "- Escuche a su cuerpo y descanse cuando lo necesite.",
        "4. Hábitos saludables:",
        habitos.bebidas_alcoholicas ? "- Deje de consumir alcohol inmediatamente. El alcohol puede causar graves problemas en el desarrollo fetal." : "",
        habitos.tabaco ? "- Deje de fumar lo antes posible. El tabaco aumenta el riesgo de complicaciones en el embarazo." : "",
        !habitos.hogar_libre_tabaco ? "- Evite la exposición al humo de segunda mano." : "",
        "- Considere unirse a un programa de apoyo para dejar de fumar y beber si es necesario.",
        "5. Cuidados especiales:",
        antecedentesObstetricos.parto_prematuro ? "- Esté atenta a los signos de parto prematuro como contracciones, sangrado o pérdida de líquido." : "",
        "- Descanse frecuentemente y evite estar de pie por periodos prolongados.",
        "- Use medias de compresión si se le recomiendan para mejorar la circulación.",
        antecedentesObstetricos.perdida ? "- Discuta con su médico sobre la necesidad de medicamentos para prevenir el parto prematuro." : "",
        "6. Salud mental:",
        "- Practique técnicas de relajación como meditación o respiración profunda para manejar la ansiedad.",
        "- Considere la terapia o el asesoramiento psicológico especializado en embarazo si es necesario.",
        "- Únase a un grupo de apoyo para embarazadas para compartir experiencias y recibir apoyo emocional.",
        "- Comunique abiertamente sus preocupaciones y sentimientos a su pareja y familia.",
        "- Mantenga un diario para expresar sus pensamientos y emociones si lo encuentra útil."
    ];
    return recomendaciones.filter(item => item !== "").join("\n");
}
