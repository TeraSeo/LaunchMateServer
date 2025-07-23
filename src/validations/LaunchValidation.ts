import { body, query } from 'express-validator';

export const launchWithAnswersValidation = () => {
    return [
    body('answers')
      .exists().withMessage('Answers array is required')
      .isArray({ min: 6, max: 6 }).withMessage('Answers must be an array of 6 elements'),
  
    body('answers.*')
      .isString().withMessage('Each answer must be a string')
      .notEmpty().withMessage('Each answer must be non-empty')
    ]
};

export const launchWithIdeaNAnswersValidation = () => {
  return [
  body('baseIdea')
    .exists().withMessage('Base idea is required'),
  body('answers')
    .exists().withMessage('Answers array is required')
    .isArray({ min: 6, max: 6 }).withMessage('Answers must be an array of 6 elements'),

  body('answers.*')
    .isString().withMessage('Each answer must be a string')
    .notEmpty().withMessage('Each answer must be non-empty')
  ]
};

export const launchDetailedIdeaValidation = () => {
  return [
    body('idea')
      .exists().withMessage('Idea is required')
  ]
};

export const createIdeaValidation = () => {
  return [
    body('token')
      .exists().withMessage('Token is required')
      .bail()
      .notEmpty().withMessage('Token must not be empty')
      .custom((val) => val !== null).withMessage('Token must not be null'),

    body('answers')
      .exists().withMessage('Answers array is required')
      .bail()
      .isArray({ min: 6, max: 6 }).withMessage('Answers must be an array of 6 elements')
      .custom((arr) => {
        if (!Array.isArray(arr)) return false;
        return arr.every(item => typeof item === 'string' && item.trim() !== '');
      }).withMessage('Each answer must be a non-empty string'),
  ];
};

export const createDetailedIdeaValidation = () => {
  return [
    body('id')
      .exists().withMessage('ideaId is required')
      .bail()
      .not().isEmpty().withMessage('ideaId must not be empty')
      .bail()
      .custom((val) => val !== null).withMessage('ideaId must not be null')
      .bail()
      .isInt().withMessage('ideaId must be an integer'),

    body('detailed.startupTitle')
      .exists().withMessage('startupTitle is required')
      .bail()
      .notEmpty().withMessage('startupTitle must not be empty')
      .custom(val => val !== null).withMessage('startupTitle must not be null'),

    body('detailed.description')
      .exists().withMessage('description is required')
      .bail()
      .notEmpty().withMessage('description must not be empty')
      .custom(val => val !== null).withMessage('description must not be null'),

    body('detailed.businessPlanSummary')
      .exists().withMessage('planSummary is required')
      .bail()
      .notEmpty().withMessage('planSummary must not be empty')
      .custom(val => val !== null).withMessage('planSummary must not be null'),

    body('detailed.marketAnalysis')
      .exists().withMessage('marketAnalysis is required')
      .bail()
      .notEmpty().withMessage('marketAnalysis must not be empty')
      .custom(val => val !== null).withMessage('marketAnalysis must not be null'),

    body('detailed.competitorAnalysis')
      .exists().withMessage('competitorAnalysis is required')
      .bail()
      .notEmpty().withMessage('competitorAnalysis must not be empty')
      .custom(val => val !== null).withMessage('competitorAnalysis must not be null'),

    body('detailed.revenueModel')
      .exists().withMessage('revenueModel is required')
      .bail()
      .notEmpty().withMessage('revenueModel must not be empty')
      .custom(val => val !== null).withMessage('revenueModel must not be null'),

    body('detailed.swotSnapshot')
      .exists().withMessage('swotSnapshot is required')
      .bail()
      .notEmpty().withMessage('swotSnapshot must not be empty')
      .custom(val => val !== null).withMessage('swotSnapshot must not be null'),
  ];
};

export const validateIdeaIdQuery = () => [
  query('ideaId')
    .exists().withMessage('ideaId is required')
    .bail()
    .custom((val) => val !== null).withMessage('ideaId must not be null')
    .bail()
    .isInt().withMessage('ideaId must be a valid integer'),
];