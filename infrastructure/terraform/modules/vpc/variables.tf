variable "name" {
  type        = string
  description = "Name of the VPC"
}

variable "cidr" {
  type        = string
  description = "CIDR block"
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  type        = list(string)
  description = "List of public subnet CIDRs"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  type        = list(string)
  description = "List of private subnet CIDRs"
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}
