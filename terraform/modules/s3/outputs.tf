output "name" {
  description = "Name of the bucket"
  value       = aws_s3_bucket.bucket.bucket
}

output "arn" {
  description = "ARN of the bucket"
  value       = aws_s3_bucket.bucket.arn
}

output "id" {
  description = "ARN of the bucket"
  value       = aws_s3_bucket.bucket.id
}

output "domain_name" {
  description = "Location of the bucket"
  value       = aws_s3_bucket.bucket.bucket_domain_name
}

