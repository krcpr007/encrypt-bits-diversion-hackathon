import boto3
AWS_ACCESS_KEY = 'AKIA5XAQXLQR6JRXFJXO'
AWS_SECRET_KEY = '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'
S3_BUCKET_NAME = 'encrypt-bits'

# Initialize AWS S3 client
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)