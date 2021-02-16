
provider "aws" {
  version = "3.0.0"
  region  = "us-east-1"
  profile = "erinjoost"
}

terraform {
  required_version = "~> 0.13.0"
  backend "s3" {
    bucket  = "erinjoost-tfstate"
    profile = "erinjoost"
    key     = "web-developer-test"
    region  = "us-east-1"
  }
}


/*module "cloudfront" {
  source = "./modules/cloudfront"
  s3_domain_name      = module.s3.domain_name
  domain_name_aliases = [var.domain_name]
  acm_arn             = var.acm_arn

  application_name    = var.application_name
  environment         = var.environment
  application_tag     = var.application_tag
  repo_tag            = var.repo_tag
  creator_tag         = var.creator_tag
}

module "dns" {
  source             = "./modules/dns"
  domain_name_dns    = var.domain_name
  dns_zone_id        = var.dns_zone_id
  cdn_domain_name    = module.cloudfront.cdn_domain_name
  cdn_hosted_zone_id = module.cloudfront.cdn_hosted_zone_id

  application_name = var.application_name
  environment      = var.environment
  application_tag  = var.application_tag
  repo_tag         = var.repo_tag
  creator_tag      = var.creator_tag
}*/

module api_lambda {
  source = "./modules/lambda"

  lambda_function_name = "${var.application_tag}-${var.environment}"
  git_commit_id        = var.git_commit_id

  dynamo_db_name = "${var.application_tag}-${var.environment}-inventory"
  dynamo_db_arn  = module.dynamo_db.dynamo_arn
  bucket_id      = module.s3.id
  bucket_arn     = module.s3.arn

  application_name = var.application_name
  environment      = var.environment
  application_tag  = var.application_tag
  repo_tag         = var.repo_tag
  creator_tag      = var.creator_tag
}

module "s3" {
  source = "./modules/s3"
  name   = "${var.application_tag}"
  acl    = "private"

  application_name = var.application_name
  environment      = var.environment
  application_tag  = var.application_tag
  repo_tag         = var.repo_tag
  creator_tag      = var.creator_tag

}

module dynamo_db {
  source         = "./modules/dynamo"
  dynamo_db_name = "${var.application_tag}-${var.environment}-inventory"

  application_name = var.application_name
  environment      = var.environment
  application_tag  = var.application_tag
  repo_tag         = var.repo_tag
  creator_tag      = var.creator_tag
}