output dynamo_arn {
  value = aws_dynamodb_table.dynamo_db.arn
}

output table_name {
  value = aws_dynamodb_table.dynamo_db.name
}