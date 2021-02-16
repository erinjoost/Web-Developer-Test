output "cdn_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "cdn_hosted_zone_id" {
  value = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}

output "iam_arn" {
  value = aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn
}