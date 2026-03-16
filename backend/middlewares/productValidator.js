// backend/middlewares/productValidator.js
const { body, validationResult } = require('express-validator');

/**
 * REGLAS DE ENTRADA (El Escáner)
 */
const validateProduct = [
    // Regla 1: El nombre debe existir y ser texto
    body('name')
        .notEmpty().withMessage('¡Soldado! El nombre del producto es obligatorio')
        .isString().withMessage('El nombre debe ser un texto'),

    // Regla 2: El precio debe ser un número positivo
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('¡Error! El precio debe ser mayor a 0'),

    // Regla 3: El store_id debe estar presente
    body('store_id')
        .notEmpty().withMessage('Debe indicar a qué tienda pertenece este suministro'),

    // VEREDICTO FINAL
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si el escáner pita, no lo dejamos pasar y enviamos el reporte
            return res.status(400).json({ errors: errors.array() });
        }
        // Si todo está en orden, ¡adelante a la oficina del controlador!
        next();
    }
];

module.exports = { validateProduct };