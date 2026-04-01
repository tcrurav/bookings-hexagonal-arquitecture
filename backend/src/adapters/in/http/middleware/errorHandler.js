import { BusinessException } from '../../../../core/domain/exception/BusinessException.js';
import { NotFoundException } from '../../../../core/domain/exception/NotFoundException.js';

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof BusinessException) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NotFoundException) {
    return res.status(404).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
};
