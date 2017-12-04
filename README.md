# pictarium

写真共有サービス

## AWSのGUIから設定したもの

- Coginito pool idの取得

- S3のBucketPolycyの設定変更

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::pictarium-photos/*"
        }
    ]
}
```
