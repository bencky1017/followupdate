#!/usr/bin/env sh

# ��������ʱ��ֹ
set -e

# ����
npm run build

# ���빹���ļ���
cd dist

# �����Ҫ�����Զ�������
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# �����Ҫ������ https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# �����Ҫ������ https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
