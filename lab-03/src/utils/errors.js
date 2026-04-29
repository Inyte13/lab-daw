export class DomainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends DomainError {
  constructor(message = 'Recurso no encontrado') {
    super(message)
  }
}

export class ValidationError extends DomainError {
  constructor(message = 'Datos de entrada inválidos') {
    super(message)
  }
}

export class ConflictError extends DomainError {
  constructor(message = 'El recurso ya existe') {
    super(message)
  }
}
