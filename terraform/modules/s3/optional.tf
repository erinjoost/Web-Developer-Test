variable "name" {
  default = null
}

variable "prefix" {
  default = null
}

variable "is_public" {
  default = false
}

variable "is_versioned" {
  default = true
}

variable "acl" {
  default = "private"
}

variable "environment" {}
variable "application_name" {}
variable "application_tag" {}
variable "repo_tag" {}
variable "creator_tag" {}
