resource aws_iam_role lambda_role {
  name = "${var.application_tag}-role-${var.environment}"

  assume_role_policy = <<ROLE
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
ROLE
}

data aws_iam_policy_document lambda_policy_document {
  statement {
    actions = [
      "s3:*",
    ]

    effect = "Allow"

    resources = [
      var.bucket_arn,
    ]
  }

  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
      "logs:DescribeLogGroups",
    ]

    effect = "Allow"

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:BatchWriteItem",
    ]

    effect = "Allow"

    resources = [
      var.dynamo_db_arn,
    ]
  }
}

