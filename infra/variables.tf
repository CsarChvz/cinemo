variable "app_name" {
  description = "Nombre de la aplicación, usado como prefijo en todos los recursos"
  type        = string
  default     = "cinemo"
}

variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Perfil de AWS CLI a usar"
  type        = string
  default     = "default"
}

variable "db_name" {
  description = "Nombre de la base de datos PostgreSQL"
  type        = string
  default     = "mydatabase"
}

variable "db_user" {
  description = "Usuario de la base de datos"
  type        = string
  default     = "myuser"
}

variable "db_password" {
  description = "Contraseña de la base de datos"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Secret para firmar JWTs"
  type        = string
  sensitive   = true
}

variable "cors_allow_origins" {
  description = "Orígenes permitidos en CORS del API Gateway"
  type        = list(string)
  default     = ["*"]
}