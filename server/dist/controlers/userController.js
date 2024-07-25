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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../models/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inference_1 = require("@huggingface/inference");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hf = new inference_1.HfInference(process.env.HUGGINGFACE_TOKEN);
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, contraseña, fecha_nacimiento, telefono } = req.body;
    // Validación de entrada
    if (!nombre || !correo || !contraseña || !fecha_nacimiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        // Verificar si el correo ya existe
        const { rows: existingUser } = yield db_1.default.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(contraseña, salt);
        // Insertar el usuario en la base de datos
        yield db_1.default.query(`
      INSERT INTO usuario (nombre, apellido, correo, contraseña, fecha_nacimiento, telefono)
      VALUES ($1, $2, $3, $4, $5, $6)
      `, [nombre, apellido, correo, hashedPassword, fecha_nacimiento, telefono]);
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
        const { rows: existingUser } = yield db_1.default.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
        if (existingUser.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        const usuario = existingUser[0];
        // Verificar la contraseña
        const contraseñaValida = bcryptjs_1.default.compareSync(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        // Generar JWT
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, correo: usuario.correo }, process.env.SECRET_KEY || '123', { expiresIn: '1h' } // Expiración del token (opcional)
        );
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
        yield db_1.default.query(`
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
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
        ]);
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
        yield db_1.default.query(`
      INSERT INTO antecedentes_obstetricos (
        usuario_id,
        embarazos_previos,
        preeclampsia,
        parto_prematuro,
        hemorragias,
        perdida
      ) VALUES ($1, $2, $3, $4, $5, $6)
      `, [
            usuario_id,
            embarazos_previos,
            preeclampsia,
            parto_prematuro,
            hemorragias,
            perdida
        ]);
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
    const { usuario_id, enfermedad_actual, bajo_liquido_amniotico, alto_liquido_amniotico, anomalía_fetal, crecimiento_disminuido, in_vitro, gestacion_multiple, semanas_embarazo, numero_fetos } = req.body;
    // Validación de entrada
    if (!usuario_id || semanas_embarazo === undefined || numero_fetos === undefined) {
        return res.status(400).json({ message: 'Usuario ID, semanas de embarazo y número de fetos son campos obligatorios' });
    }
    try {
        // Insertar la información del embarazo actual en la base de datos
        yield db_1.default.query(`
      INSERT INTO embarazo_actual (
        usuario_id,
        enfermedad_actual,
        bajo_liquido_amniotico,
        alto_liquido_amniotico,
        "anomalía_fetal", 
        crecimiento_disminuido,
        in_vitro,
        gestacion_multiple,
        semanas_embarazo,
        numero_fetos
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
            usuario_id,
            enfermedad_actual,
            bajo_liquido_amniotico,
            alto_liquido_amniotico,
            anomalía_fetal,
            crecimiento_disminuido,
            in_vitro,
            gestacion_multiple,
            semanas_embarazo,
            numero_fetos
        ]);
        // Respuesta exitosa
        res.status(201).json({ message: 'Información del embarazo actual creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información del embarazo actual', error });
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
        yield db_1.default.query(`
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
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
        ]);
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
        yield db_1.default.query(`
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
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
        ]);
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
        yield db_1.default.query(`
      INSERT INTO actividad_fisica (
        usuario_id,
        actividad_fisica,
        frecuencia_actividad,
        tiempo_actividad
      ) VALUES ($1, $2, $3, $4)
      `, [
            usuario_id,
            actividad_fisica,
            frecuencia_actividad,
            tiempo_actividad
        ]);
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
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'No se encontró ID' });
    }
    try {
        // Obtener datos del usuario
        const { rows: usuario } = yield db_1.default.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const usuarioId = usuario[0].id;
        // Obtener datos médicos
        const { rows: datosMedicos } = yield db_1.default.query('SELECT * FROM datos_medicos WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
        // Obtener antecedentes obstétricos
        const { rows: antecedentesObstetricos } = yield db_1.default.query('SELECT * FROM antecedentes_obstetricos WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
        // Obtener embarazo actual
        const { rows: embarazoActual } = yield db_1.default.query('SELECT * FROM embarazo_actual WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
        // Obtener hábitos
        const { rows: habitos } = yield db_1.default.query('SELECT * FROM habitos WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
        // Obtener nutrición
        const { rows: nutricion } = yield db_1.default.query('SELECT * FROM nutricion WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
        // Obtener actividad física
        const { rows: actividadFisica } = yield db_1.default.query('SELECT * FROM actividad_fisica WHERE usuario_id = $1 ORDER BY id DESC LIMIT 1', [usuarioId]);
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
        // Obtener recomendaciones locales
        const recomendaciones = yield obtenerRecomendacionesLocales(datosUsuario);
        const prompt = yield crearPromptSimplificado(datosUsuario);
        const recomendacionesIA = yield obtenerRecomendacionesIA(prompt, datosUsuario);
        const resultados = yield calcularPorcentajesSeguridad(datosUsuario);
        // Incluir el prompt y las recomendaciones en la respuesta
        res.status(200).json({
            datosUsuario,
            recomendaciones,
            recomendacionesIA,
            resultados
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
                    max_new_tokens: 150,
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
        datosMedicos.diabetes ? "- Controle sus niveles de azúcar en sangre regularmente y siga una dieta específica para diabetes gestacional." : "",
        datosMedicos.hipertiroidismo || datosMedicos.hipotiroidismo ? "- Realice controles de función tiroidea según las indicaciones de su endocrinólogo." : "",
        datosMedicos.asma ? "- Mantenga su plan de manejo del asma y consulte con su médico sobre ajustes necesarios durante el embarazo." : "",
        datosMedicos.ETS ? "- Siga el tratamiento indicado para enfermedades de transmisión sexual y realice controles adicionales para proteger al feto." : "",
        datosMedicos.enfermedad_cardiaca ? "- Consulte con un cardiólogo para un seguimiento especializado durante el embarazo." : "",
        datosMedicos.enfermedad_renal ? "- Realice controles renales frecuentes y siga una dieta baja en sodio si es necesario." : "",
        antecedentesObstetricos.preeclampsia ? "- Esté atenta a los signos de preeclampsia como hinchazón, dolor de cabeza intenso o cambios en la visión." : "",
        "2. Nutrición:",
        "- Consuma una dieta balanceada rica en frutas, verduras, proteínas magras y granos integrales.",
        "- Tome suplementos prenatales que incluyan ácido fólico, hierro y calcio según lo recomendado por su médico.",
        "- Evite alimentos crudos o poco cocidos, y limite el consumo de cafeína.",
        "- Manténgase bien hidratada bebiendo al menos 8-10 vasos de agua al día.",
        nutricion.dieta === 1 ? "- Consulte con un nutricionista para asegurar que su dieta vegetariana/vegana cubra todas sus necesidades nutricionales." : "",
        nutricion.comida_rapida >= 3 ? "- Reduzca el consumo de comida rápida y opte por opciones más saludables y caseras." : "",
        nutricion.numero_vasos < 6 ? "- Aumente su ingesta de agua. Intente beber al menos 8 vasos al día." : "",
        "3. Actividad física:",
        actividadFisica.actividad_fisica ? `- Continúe con su actividad física ${actividadFisica.frecuencia_actividad.toLowerCase()}, ${actividadFisica.tiempo_actividad} por sesión. Consulte a su médico sobre la intensidad adecuada.` : "- Consulte con su médico sobre la actividad física adecuada durante el embarazo.",
        "- Considere actividades de bajo impacto como caminar, nadar o yoga prenatal.",
        "- Evite actividades que impliquen riesgo de caídas o golpes en el abdomen.",
        "- Escuche a su cuerpo y descanse cuando lo necesite.",
        embarazoActual.gestacion_multiple ? "- Adapte su actividad física a las recomendaciones específicas para embarazos múltiples." : "",
        "4. Hábitos saludables:",
        habitos.bebidas_alcoholicas ? "- Deje de consumir alcohol inmediatamente. El alcohol puede causar graves problemas en el desarrollo fetal." : "",
        habitos.tabaco ? "- Deje de fumar lo antes posible. El tabaco aumenta el riesgo de complicaciones en el embarazo." : "",
        !habitos.hogar_libre_tabaco ? "- Evite la exposición al humo de segunda mano." : "",
        habitos.drogas ? "- Deje de consumir drogas inmediatamente y busque ayuda profesional si es necesario." : "",
        "- Considere unirse a un programa de apoyo para dejar hábitos nocivos si es necesario.",
        "5. Cuidados especiales:",
        antecedentesObstetricos.parto_prematuro ? "- Esté atenta a los signos de parto prematuro como contracciones, sangrado o pérdida de líquido." : "",
        "- Descanse frecuentemente y evite estar de pie por periodos prolongados.",
        "- Use medias de compresión si se le recomiendan para mejorar la circulación.",
        antecedentesObstetricos.perdida ? "- Discuta con su médico sobre la necesidad de medicamentos para prevenir el parto prematuro." : "",
        embarazoActual.bajo_liquido_amniotico ? "- Aumente su ingesta de líquidos y siga las recomendaciones médicas para manejar el bajo líquido amniótico." : "",
        embarazoActual.alto_liquido_amniotico ? "- Siga las indicaciones médicas para manejar el polihidramnios y esté atenta a signos de complicaciones." : "",
        embarazoActual.anomalía_fetal ? "- Asista a controles especializados para monitorear la anomalía fetal detectada." : "",
        embarazoActual.crecimiento_disminuido ? "- Siga una dieta especial y controles frecuentes para monitorear el crecimiento fetal." : "",
        embarazoActual.in_vitro ? "- Siga las recomendaciones específicas para embarazos por fertilización in vitro." : "",
        "6. Salud mental:",
        "- Practique técnicas de relajación como meditación o respiración profunda para manejar la ansiedad.",
        datosMedicos.ansiedad || datosMedicos.depresion ? "- Continúe con su tratamiento para ansiedad/depresión bajo supervisión médica." : "",
        "- Considere la terapia o el asesoramiento psicológico especializado en embarazo si es necesario.",
        "- Únase a un grupo de apoyo para embarazadas para compartir experiencias y recibir apoyo emocional.",
        "- Comunique abiertamente sus preocupaciones y sentimientos a su pareja y familia.",
        "- Mantenga un diario para expresar sus pensamientos y emociones si lo encuentra útil."
    ];
    return recomendaciones.filter(item => item !== "").join("\n");
}
function calcularPorcentajesSeguridad(datosUsuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuario, datosMedicos, antecedentesObstetricos, embarazoActual, habitos, nutricion, actividadFisica } = datosUsuario;
        const resultados = {
            datosMedicos: calcularPorcentajeDatosMedicos(datosMedicos),
            antecedentesObstetricos: calcularPorcentajeAntecedentesObstetricos(antecedentesObstetricos),
            embarazoActual: calcularPorcentajeEmbarazoActual(embarazoActual),
            habitos: calcularPorcentajeHabitos(habitos),
            nutricion: calcularPorcentajeNutricion(nutricion),
            actividadFisica: calcularPorcentajeActividadFisica(actividadFisica)
        };
        const porcentajeTotal = Object.values(resultados).reduce((sum, valor) => sum + valor, 0) / Object.keys(resultados).length;
        // Guardar o actualizar los resultados en la base de datos
        yield db_1.default.query(`
          INSERT INTO resultados (
            usuario_id, 
            porcentaje_datos_medicos, 
            porcentaje_antecedentes_obstetricos, 
            porcentaje_embarazo_actual, 
            porcentaje_habitos, 
            porcentaje_nutricion, 
            porcentaje_actividad_fisica, 
            porcentaje_total, 
            nivel_riesgo_total
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (usuario_id) DO UPDATE SET
            porcentaje_datos_medicos = EXCLUDED.porcentaje_datos_medicos,
            porcentaje_antecedentes_obstetricos = EXCLUDED.porcentaje_antecedentes_obstetricos,
            porcentaje_embarazo_actual = EXCLUDED.porcentaje_embarazo_actual,
            porcentaje_habitos = EXCLUDED.porcentaje_habitos,
            porcentaje_nutricion = EXCLUDED.porcentaje_nutricion,
            porcentaje_actividad_fisica = EXCLUDED.porcentaje_actividad_fisica,
            porcentaje_total = EXCLUDED.porcentaje_total,
            nivel_riesgo_total = EXCLUDED.nivel_riesgo_total
        `, [
            datosUsuario.usuario.id,
            resultados.datosMedicos,
            resultados.antecedentesObstetricos,
            resultados.embarazoActual,
            resultados.habitos,
            resultados.nutricion,
            resultados.actividadFisica,
            porcentajeTotal,
            getNivelRiesgo(porcentajeTotal)
        ]);
        return {
            porcentajesPorSeccion: resultados,
            porcentajeTotal: Math.round(porcentajeTotal),
            nivelRiesgoTotal: getNivelRiesgo(porcentajeTotal)
        };
    });
}
function calcularPorcentajeDatosMedicos(datosMedicos) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (datosMedicos.hipertension)
        puntosRestados += 10;
    if (datosMedicos.diabetes)
        puntosRestados += 10;
    if (datosMedicos.hipertiroidismo || datosMedicos.hipotiroidismo)
        puntosRestados += 8;
    if (datosMedicos.asma)
        puntosRestados += 5;
    if (datosMedicos.cancer)
        puntosRestados += 20;
    if (datosMedicos.ETS)
        puntosRestados += 15;
    if (datosMedicos.ansiedad || datosMedicos.depresion)
        puntosRestados += 8;
    if (datosMedicos.enfermedad_cardiaca)
        puntosRestados += 15;
    if (datosMedicos.enfermedad_renal)
        puntosRestados += 12;
    return Math.max(0, puntosTotales - puntosRestados);
}
function calcularPorcentajeAntecedentesObstetricos(antecedentesObstetricos) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (antecedentesObstetricos.preeclampsia)
        puntosRestados += 20;
    if (antecedentesObstetricos.parto_prematuro)
        puntosRestados += 25;
    if (antecedentesObstetricos.hemorragias)
        puntosRestados += 15;
    if (antecedentesObstetricos.perdida)
        puntosRestados += 10;
    return Math.max(0, puntosTotales - puntosRestados);
}
function calcularPorcentajeEmbarazoActual(embarazoActual) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (embarazoActual.bajo_liquido_amniotico)
        puntosRestados += 15;
    if (embarazoActual.alto_liquido_amniotico)
        puntosRestados += 12;
    if (embarazoActual.anomalía_fetal)
        puntosRestados += 25;
    if (embarazoActual.crecimiento_disminuido)
        puntosRestados += 20;
    if (embarazoActual.gestacion_multiple)
        puntosRestados += 15;
    puntosRestados += Math.max(0, embarazoActual.numero_fetos - 1) * 10;
    return Math.max(0, puntosTotales - puntosRestados);
}
function calcularPorcentajeHabitos(habitos) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (habitos.bebidas_alcoholicas) {
        puntosRestados += 30;
        if (habitos.frecuencia_alcohol === 'Diariamente')
            puntosRestados += 20;
    }
    if (habitos.tabaco) {
        puntosRestados += 25;
        if (habitos.frecuencia_tabaco === 'Diariamente')
            puntosRestados += 15;
    }
    if (habitos.drogas)
        puntosRestados += 40;
    if (!habitos.hogar_libre_tabaco)
        puntosRestados += 10;
    return Math.max(0, puntosTotales - puntosRestados);
}
function calcularPorcentajeNutricion(nutricion) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (nutricion.dieta === 1)
        puntosRestados += 5; // Dieta vegetariana/vegana
    if (nutricion.frutas < 2)
        puntosRestados += 10;
    if (nutricion.verduras < 2)
        puntosRestados += 10;
    if (nutricion.comida_rapida > 2)
        puntosRestados += 15;
    if (nutricion.numero_vasos < 6)
        puntosRestados += 10;
    return Math.max(0, puntosTotales - puntosRestados);
}
function calcularPorcentajeActividadFisica(actividadFisica) {
    let puntosTotales = 100;
    let puntosRestados = 0;
    if (!actividadFisica.actividad_fisica) {
        puntosRestados += 50;
    }
    else {
        if (actividadFisica.frecuencia_actividad === 'Raramente')
            puntosRestados += 30;
        if (actividadFisica.tiempo_actividad === 'Menos de 15 minutos')
            puntosRestados += 20;
    }
    return Math.max(0, puntosTotales - puntosRestados);
}
function getNivelRiesgo(porcentaje) {
    if (porcentaje >= 90)
        return "Bajo riesgo";
    if (porcentaje >= 75)
        return "Riesgo moderado bajo";
    if (porcentaje >= 60)
        return "Riesgo moderado";
    if (porcentaje >= 45)
        return "Riesgo moderado alto";
    return "Alto riesgo";
}
