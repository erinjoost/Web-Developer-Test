output "main_api_domain_name" {
  value = aws_apigatewayv2_domain_name.api_gw_domain_name.domain_name_configuration[0].target_domain_name
}
