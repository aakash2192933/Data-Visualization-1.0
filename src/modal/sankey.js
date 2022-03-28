import Joi from 'joi';

export const SankeySchema = Joi.array().items(
    Joi.object({
        source: Joi.string(),
        target: Joi.string(),
        value: Joi.number(),
        date: Joi.date(),
    })
);
