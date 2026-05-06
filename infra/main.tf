provider "aws" {
  region = "ap-south-1"
}

# 🔐 Security Group
resource "aws_security_group" "idp_sg" {
  name = "idp-sg"

  ingress {
    description = "Allow app traffic"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 💻 EC2 Instance
resource "aws_instance" "idp_server" {
  ami           = "ami-034a8236c75419857"
  instance_type = "t3.micro"

  # 🔑 Attach your AWS key pair
  key_name = "pemfile"

  security_groups = [aws_security_group.idp_sg.name]

  tags = {
    Name        = "Mini-IDP"
    Environment = "Dev"
    Project     = "Platform-Engineering"
  }

  # ⚙️ Install Docker automatically
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker git
              service docker start
              usermod -a -G docker ec2-user
              EOF
}