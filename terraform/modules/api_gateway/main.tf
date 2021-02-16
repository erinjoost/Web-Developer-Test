resource "aws_apigatewayv2_api" "main_api" {
  name          = var.api_name
  protocol_type = "HTTP"
  cors_configuration {
    allow_headers = ["authorization", "content-type", "x-amz-date", "x-amz-security-token", "x-api-key", ]
    allow_methods = ["GET", "OPTIONS", "POST", "PUT"]
    allow_origins = ["*", ]
  }
  tags = {
    Name        = var.application_name
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }
}

resource "aws_apigatewayv2_route" "results_route" {
  route_key = "*"
  api_id    = aws_apigatewayv2_api.main_api.id
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.main_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = var.lambda_invoke_arn
  payload_format_version = "2.0"
}


resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.main_api.id
  name        = var.api_stage_name
  auto_deploy = true
}


resource "aws_apigatewayv2_deployment" "deployment" {
  api_id = aws_apigatewayv2_api.main_api.id
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "allow_api_gateway_invocation" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.main_api.execution_arn}/*/*/*"
}

resource "aws_apigatewayv2_domain_name" "api_gw_domain_name" {
  domain_name = var.api_gw_alias

  domain_name_configuration {
    certificate_arn = var.acm_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}
