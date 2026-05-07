provider "aws" {
  region = "ap-south-1"
}

# 🔐 Security Group
resource "aws_security_group" "idp_sg" {

  name = "idp-sg"

  # SSH
  ingress {

    description = "Allow SSH"

    from_port   = 22
    to_port     = 22
    protocol    = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node.js App
  ingress {

    description = "Allow App Traffic"

    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {

    description = "Allow Grafana"

    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Prometheus
  ingress {

    description = "Allow Prometheus"

    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node Exporter
  ingress {

    description = "Allow Node Exporter"

    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound Traffic
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

  # 🔑 AWS Key Pair
  key_name = "pemfile"

  security_groups = [
    aws_security_group.idp_sg.name
  ]

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

              chkconfig docker on

              usermod -a -G docker ec2-user
              EOF
}

