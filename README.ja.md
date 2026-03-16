# 観光来訪者数 都道府県市区町村別

この GitHub リポジトリには、日本の都道府県別、市区町村別の観光来訪者数のデータが含まれています。

## データ・API
このデータは「[デジタル観光統計オープンデータ](https://www.nihon-kankou.or.jp/home/jigyou/research/d-toukei/)」から取得しています。

## 機能
- 都道府県および主要都市の月別観光来訪者数データ
- GitHub Actionsによる自動データ更新
- 簡単に利用できる単一のCSVデータファイル

## 使い方
このプロジェクトはDenoを使ってLatestのCSVデータファイルをダウンロードし、`data/all.csv`ファイルにまとめています。最新のデータを取得するには以下のコマンドを実行してください:

1. Denoのインストール: https://deno.land/
2. 以下のコマンドを実行:

```
deno run -A download.js
deno run -A make.js
```

これにより`data/all.csv`ファイルが生成されます。

## ライセンス
このプロジェクトは MIT License の下で提供されています。