# xction.co.kr

## 도커 테스트

로컬 환경에 도커 설치 후

```shell
docker build -t test .
docker run -p 3000:3000 test:latest
```

이후 `http://localhost:3000` 으로 접속
