resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "for s3"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = var.s3_domain_name
    origin_id   = var.application_tag

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Some comment"
  default_root_object = "index.html"


  aliases = var.domain_name_aliases

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.application_tag

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }


    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    application = var.application_tag
    environment = var.environment
    creator     = var.creator_tag
    repo        = var.repo_tag
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_arn
    ssl_support_method  = "sni-only"
  }
}
