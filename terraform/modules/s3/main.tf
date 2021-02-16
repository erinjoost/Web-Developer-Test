
resource "aws_s3_bucket" "bucket" {
  bucket = var.name
  acl    = var.is_public ? "public-read" : var.acl

  website {
    index_document = "index.html"
  }

  versioning {
    enabled = var.is_versioned
  }

  tags = {
    Name        = var.name
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }
}

resource "aws_s3_bucket_policy" "policy" {
  count  = var.is_public ? 1 : 0
  bucket = aws_s3_bucket.bucket.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "AllowPublicAccess",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.bucket.id}/*"
    }
  ]
}
POLICY
}
