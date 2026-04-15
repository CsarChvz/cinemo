output "ecr_repository_url" {
  description = "URL del repositorio ECR para hacer push de la imagen"
  value       = aws_ecr_repository.api.repository_url
}

output "api_gateway_url" {
  description = "URL pública del API Gateway (úsala en el deploy de SST)"
  value       = aws_apigatewayv2_stage.production.invoke_url
}

output "rds_endpoint" {
  description = "Endpoint de RDS (interno, solo accesible desde la VPC)"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}

output "ecs_cluster_name" {
  description = "Nombre del cluster ECS"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Nombre del servicio ECS"
  value       = aws_ecs_service.api.name
}

output "account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}