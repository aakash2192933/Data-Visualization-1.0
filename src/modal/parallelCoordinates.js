import Joi from 'joi';

export const ParallelCoordinatesSchema = Joi.array().items(
    Joi.object().pattern(/.*/, [Joi.string(), Joi.number(), Joi.date()])
);
