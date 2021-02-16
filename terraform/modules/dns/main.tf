resource "aws_route53_record" "hosting_site" {
  name    = var.domain_name_dns
  ttl     = "300"
  type    = "CNAME"
  zone_id = var.dns_zone_id
  records = [
    var.cdn_domain_name
  ]
}