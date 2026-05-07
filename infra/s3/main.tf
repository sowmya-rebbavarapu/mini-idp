terraform {
  required_providers {

    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# 📦 Dynamic Bucket Name
variable "bucket_name" {
  type = string
}

# 🪣 S3 Bucket
resource "aws_s3_bucket" "idp_bucket" {

  bucket = var.bucket_name

  tags = {
    Name        = "Mini-IDP-Bucket"
    Project     = "Mini-IDP"
    Environment = "Dev"
  }
}

# 🔓 Public Access Block
resource "aws_s3_bucket_public_access_block" "bucket_access" {

  bucket = aws_s3_bucket.idp_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

