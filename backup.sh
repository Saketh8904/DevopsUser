tar -czf backup.tar.gz project/

aws s3 cp backup.tar.gz s3://bucket-name/
