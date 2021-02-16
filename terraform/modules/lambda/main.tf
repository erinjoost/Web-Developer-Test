resource aws_lambda_function lambda {
  s3_bucket         = var.bucket_id
  s3_key            = "lambda/${var.lambda_function_name}-${var.git_commit_id}.zip"
  s3_object_version = aws_s3_bucket_object.lambda_zip.version_id

  function_name = var.lambda_function_name
  role          = aws_iam_role.lambda_role.arn
  runtime       = "nodejs12.x"
  handler       = "index.handler"
  timeout       = "600"
  memory_size   = "1024"
  environment {
    variables = {
      DYNAMO_DB_NAME = var.dynamo_db_name
    }
  }
  tags = {
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }
  depends_on = [
    aws_s3_bucket_object.lambda_zip
  ]

}

resource aws_s3_bucket_object lambda_zip {
  bucket = var.bucket_id
  key    = "lambda/${var.lambda_function_name}-${var.git_commit_id}.zip"
  source = "./modules/lambda/lambda-${var.git_commit_id}.zip"
  etag   = filemd5("./modules/lambda/lambda-${var.git_commit_id}.zip")
}