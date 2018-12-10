# Tetris

## Part1
クライアントがサーバに送るもの：操作  
サーバがクライアントに送るもの：データ  
クライアントが持っているべき処理：キー入力、データが渡ってきたときに描画処理  
サーバが持っているべき処理：ゲームロジック（参加人数分）

## Part2
サーバのMain、クライアントのMain：　クラスにする  
サーバの関数、addKeyListener(listenerClass)を追加する  
MainにKeyManagerを継承させる  
MainLogicにKeyListenerを継承させる
