import Joi from 'joi';

export const LineSchema = Joi.array().items(
    Joi.object({
        id: Joi.string(),
        x: Joi.string(),
        y: Joi.number(),
        date: Joi.date(),
    })
);
