module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = var.name
  cidr = var.cidr

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Environment = var.name
  }
}
