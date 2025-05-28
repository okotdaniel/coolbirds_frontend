provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../modules/vpc"
  name   = "nextjs-dev-vpc"
}

module "ecr" {
  source = "../modules/ecr"
  name   = "nextjs-dev"
}

module "eks" {
  source = "../modules/eks"
  cluster_name = "nextjs-dev-eks"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.subnet_ids
  environment  = "dev"
}

