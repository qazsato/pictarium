# Pictarium

パーティ会場で使う写真共有Webサービス。  
来場者が撮影した写真を、プロジェクターにスライドショーとして表示します。

### ユーザ側
![キャプチャー](https://raw.githubusercontent.com/wiki/qazsato/pictarium/images/pictarium.png)

### プロジェクター側
![キャプチャー](https://raw.githubusercontent.com/wiki/qazsato/pictarium/images/pictarium2.png)

## About Pictarium
Pictariumは、  
Node.jsベースのWebアプリケーションであり、フレームワークにExpress、データベースにMongoDBを使用しています。  
実行環境にはHeroku + mLabを使用する想定で作成してるため、下記フリープランの範囲内であれば**無料で使用**することが可能です。

- HerokuのFreeプランは**1日6時間**以上のスリープが必要 ([Heroku Pricing](https://www.heroku.com/pricing))
- mLabは**500MB**までのストレージが無料 ([mLab MongoDB](https://elements.heroku.com/addons/mongolab))

## How to use

Heroku + mLabにPictariumをセットアップする手順を記載します。  
事前にHerokuアカウントを取得しておいてください。

1. PictariumをHerokuにデプロイする

  ターミナル上で、下記コマンドを実行します。

        git clone https://github.com/qazsato/pictarium.git
        cd pictarium/
        heroku create
        git push heroku master
        heroku ps:scale web=1
        heroku open

2. mLabのAdd-onsをHerokuに追加する

  [Heroku](https://heroku.com)からデプロイしたアプリ選択し、Add-onsでmlabを追加してください。  
  追加したらターミナルに戻り、下記コマンドを実行します。
        heroku config | grep MONGOLAB_URI
        vi config/production.json # 上記MONGOLAB_URIに変更
        git add .
        git commit -m "change mongo_uri"
        git push heroku master

3. 動作確認

  - http://YOUR_APP_NAME.herokuapp.com/  
  ユーザ側画面です。写真を送信できることを確認してください。

  - http://YOUR_APP_NAME.herokuapp.com/slide  
  プロジェクター側画面です。送信した画像が表示できることを確認してください。
