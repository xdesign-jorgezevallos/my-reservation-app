provider "aws" {
  region = "eu-west-2" # Replace with your desired AWS region
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = "myreservationapp-123" # Replace with your unique bucket name
}

resource "aws_s3_bucket_ownership_controls" "website_bucket_controls" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_public_access_block" "website_bucket_access" {
  bucket                  = aws_s3_bucket.website_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# AWS 53 bucket ACL resource
resource "aws_s3_bucket_acl" "website_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.website_bucket_controls,
    aws_s3_bucket_public_access_block.website_bucket_access,
  ]

  bucket = aws_s3_bucket.website_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  # Policy JSON for allowing public read access
  policy = jsonencode({
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action": "s3:*Object",
        "Resource" : "arn:aws:s3:::myreservationapp-123/*"
      }
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "website_bucket_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

output "website_url" {
  value = aws_s3_bucket.website_bucket.bucket_domain_name
}