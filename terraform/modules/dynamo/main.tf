resource aws_dynamodb_table dynamo_db {
  name = var.dynamo_db_name

  billing_mode = "PAY_PER_REQUEST"

  hash_key = "sku"

  attribute {
    name = "sku"
    type = "S"
  }

  tags = {
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }
}

resource "aws_dynamodb_table_item" "small-t" {
  table_name = aws_dynamodb_table.dynamo_db.name
  hash_key   = aws_dynamodb_table.dynamo_db.hash_key

  item = <<ITEM
{
            "sku": {"S": "AWDT0001-S"},
            "name": {"S": "Cotten T-Shirt"},
            "size": {"S": "small"},
            "price": {"N": "10.99"},
            "stockLevel": {"N": "10"}
        }
ITEM
}

resource "aws_dynamodb_table_item" "medium-t" {
  table_name = aws_dynamodb_table.dynamo_db.name
  hash_key   = aws_dynamodb_table.dynamo_db.hash_key

  item = <<ITEM
{
            "sku": {"S": "AWDT0001-M"},
            "name": {"S": "Cotten T-Shirt"},
            "size": {"S": "medium"},
            "price": {"N": "10.99"},
            "stockLevel": {"N": "50"}
        }
ITEM
}

resource "aws_dynamodb_table_item" "large-t" {
  table_name = aws_dynamodb_table.dynamo_db.name
  hash_key   = aws_dynamodb_table.dynamo_db.hash_key

  item = <<ITEM
{
            "sku": {"S": "AWDT0001-L"},
            "name": {"S": "Cotten T-Shirt"},
            "size": {"S": "large"},
            "price": {"N": "10.99"},
            "stockLevel": {"N": "0"}
        }
ITEM
}

resource "aws_dynamodb_table_item" "baseball_cap" {
  table_name = aws_dynamodb_table.dynamo_db.name
  hash_key   = aws_dynamodb_table.dynamo_db.hash_key

  item = <<ITEM
{
            "sku": {"S": "AWDT0002"},
            "name": {"S": "Baseball cap"},
            "price": {"N": "5.99"},
            "stockLevel": {"N": "7"}
        }
ITEM
}
resource "aws_dynamodb_table_item" "shorts" {
  table_name = aws_dynamodb_table.dynamo_db.name
  hash_key   = aws_dynamodb_table.dynamo_db.hash_key

  item = <<ITEM
 {
            "sku": {"S": "AWDT0003-M"},
            "name": {"S": "Shorts"},
            "price": {"N": "14.99"},
            "stockLevel": {"N": "100"},
            "size": {"S": "medium"}
        }
ITEM
}

       