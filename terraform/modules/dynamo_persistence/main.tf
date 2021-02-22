resource aws_dynamodb_table dynamo_db {
  name = var.dynamo_db_name

  billing_mode = "PAY_PER_REQUEST"

  hash_key = "guid"

  attribute {
    name = "guid"
    type = "S"
  }

  tags = {
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }
}